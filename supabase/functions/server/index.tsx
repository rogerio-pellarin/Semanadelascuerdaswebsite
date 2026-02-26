import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.ts";

// Server v1.1 - Maestros CMS support
const app = new Hono();

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Initialize Supabase Storage bucket
async function initializeStorage() {
  const bucketName = 'make-65077a1f-gallery';
  
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      console.log(`Creating storage bucket: ${bucketName}...`);
      await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']
      });
      console.log(`✓ Storage bucket ${bucketName} created`);
    } else {
      console.log(`Storage bucket ${bucketName} already exists`);
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
}

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize database tables on startup
async function initializeTables() {
  try {
    console.log('Checking if content tables exist...');
    
    // Check if tables are already initialized
    const existingTables = await kv.get('tables_initialized');
    if (existingTables) {
      console.log('Tables already initialized');
      // Force re-check for maestros_content
      const maestrosContent = await kv.get('maestros_content');
      if (!maestrosContent || !maestrosContent.es || !maestrosContent.en || !maestrosContent.pt) {
        console.log('⚠️ Maestros content missing, forcing re-initialization...');
        await kv.del('tables_initialized');
        // Continue with initialization below
      } else {
        return;
      }
    }

    // Create sample data in KV store
    console.log('Initializing content tables...');
    
    // Site configuration with flags and dates
    await kv.set('site_config', {
      auditions_open: false, // Flag to enable/disable auditions
      event_dates: {
        start: '2026-10-05',
        end: '2026-10-10',
        display: 'Octubre 5 a 10, 2026'
      },
      audition_dates: {
        open: '2026-09-05', // Opens one month before event
        close: '2026-09-25',
        display: 'Del 5 al 25 de septiembre, 2026'
      },
      current_edition: 2026,
      location: 'Costa Rica', // Can be updated
      social_media: {
        instagram: 'https://www.instagram.com/semanadelascuerdasmed/',
        facebook: 'https://www.facebook.com/semanadelascuerdas',
        youtube: 'https://www.youtube.com/@Vivat-Musica',
        email: 'info@semanadelascuerdas.com'
      }
    });

    // Site Images - Centralized image management
    await kv.set('site_images', {
      home: {
        heroBackground: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1920&q=80',
        activities: [
          {
            id: '1',
            title: 'Clases 1:1',
            image: 'https://images.unsplash.com/photo-1696522732406-065ef560da8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHRlYWNoZXIlMjBzdHVkZW50JTIwbWFzdGVyY2xhc3N8ZW58MXx8fHwxNzcxOTkwNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080'
          },
          {
            id: '2',
            title: 'Música de Cámara',
            image: 'https://images.unsplash.com/photo-1759426080881-a48d26d02c57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoZXN0cmElMjByZWhlYXJzYWwlMjBjaGFtYmVyJTIwbXVzaWN8ZW58MXx8fHwxNzcxOTkwNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080'
          },
          {
            id: '3',
            title: 'Recitales y Audiciones',
            image: 'https://images.unsplash.com/photo-1769942785680-460b60f4ca41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxsbyUyMGNsb3NlJTIwdXAlMjBzdHJpbmclMjBpbnN0cnVtZW50fGVufDF8fHx8MTc3MTk5MDU5MXww&ixlib=rb-4.1.0&q=80&w=1080'
          }
        ]
      },
      audiciona: {
        headerImage: 'https://images.unsplash.com/photo-1767998569881-003f30728849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG11c2ljaWFuJTIwcHJhY3RpY2luZyUyMGludGVuc2V8ZW58MXx8fHwxNzcxOTkwNTkzfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      programa: {
        programImage: 'https://images.unsplash.com/photo-1768396002606-6875eb5b8f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW9saW4lMjB3b29kJTIwZ3JhaW4lMjBjbG9zZSUyMGRldGFpbHxlbnwxfHx8fDE3NzE5OTA1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      fundacion: {
        foundationImage: 'https://images.unsplash.com/photo-1759426080881-a48d26d02c57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoZXN0cmElMjByZWhlYXJzYWwlMjBjaGFtYmVyJTIwbXVzaWN8ZW58MXx8fHwxNzcxOTkwNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      galeria: [
        {
          id: '1',
          category: 'Recitales',
          title: 'Concierto final 2025',
          image: 'https://images.unsplash.com/photo-1719753458800-c09cfb167ac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHZpb2xpbmlzdCUyMGNvbmNlcnQlMjBoYWxsJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzcxOTkwNTkxfDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: '2',
          category: 'Clases maestras',
          title: 'Masterclass con Elena Reyes',
          image: 'https://images.unsplash.com/photo-1696522732406-065ef560da8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHRlYWNoZXIlMjBzdHVkZW50JTIwbWFzdGVyY2xhc3N8ZW58MXx8fHwxNzcxOTkwNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: '3',
          category: 'Ensambles',
          title: 'Cuarteto de cuerdas en ensayo',
          image: 'https://images.unsplash.com/photo-1759426080881-a48d26d02c57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoZXN0cmElMjByZWhlYXJzYWwlMjBjaGFtYmVyJTIwbXVzaWN8ZW58MXx8fHwxNzcxOTkwNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: '4',
          category: 'Momentos',
          title: 'Detalle de instrumento',
          image: 'https://images.unsplash.com/photo-1768396002606-6875eb5b8f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW9saW4lMjB3b29kJTIwZ3JhaW4lMjBjbG9zZSUyMGRldGFpbHxlbnwxfHx8fDE3NzE5OTA1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: '5',
          category: 'Recitales',
          title: 'Presentación de cellista',
          image: 'https://images.unsplash.com/photo-1769942785680-460b60f4ca41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxsbyUyMGNsb3NlJTIwdXAlMjBzdHJpbmclMjBpbnN0cnVtZW50fGVufDF8fHx8MTc3MTk5MDU5MXww&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: '6',
          category: 'Momentos',
          title: 'Concentración intensa',
          image: 'https://images.unsplash.com/photo-1767998569881-003f30728849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG11c2ljaWFuJTIwcHJhY3RpY2luZyUyMGludGVuc2V8ZW58MXx8fHwxNzcxOTkwNTkzfDA&ixlib=rb-4.1.0&q=80&w=1080'
        }
      ],
      ediciones: [
        {
          id: '1',
          year: 2025,
          image: 'https://images.unsplash.com/photo-1719753458800-c09cfb167ac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHZpb2xpbmlzdCUyMGNvbmNlcnQlMjBoYWxsJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzcxOTkwNTkxfDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: '2',
          year: 2024,
          image: 'https://images.unsplash.com/photo-1759426080881-a48d26d02c57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoZXN0cmElMjByZWhlYXJzYWwlMjBjaGFtYmVyJTIwbXVzaWN8ZW58MXx8fHwxNzcxOTkwNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: '3',
          year: 2023,
          image: 'https://images.unsplash.com/photo-1696522732406-065ef560da8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHRlYWNoZXIlMjBzdHVkZW50JTIwbWFzdGVyY2xhc3N8ZW58MXx8fHwxNzcxOTkwNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: '4',
          year: 2022,
          image: 'https://images.unsplash.com/photo-1769942785680-460b60f4ca41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxsbyUyMGNsb3NlJTIwdXAlMjBzdHJpbmclMjBpbnN0cnVtZW50fGVufDF8fHx8MTc3MTk5MDU5MXww&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: '5',
          year: 2021,
          image: 'https://images.unsplash.com/photo-1768396002606-6875eb5b8f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW9saW4lMjB3b29kJTIwZ3JhaW4lMjBjbG9zZSUyMGRldGFpbHxlbnwxfHx8fDE3NzE5OTA1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: '6',
          year: 2020,
          image: 'https://images.unsplash.com/photo-1767998569881-003f30728849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG11c2ljaWFuJTIwcHJhY3RpY2luZyUyMGludGVuc2V8ZW58MXx8fHwxNzcxOTkwNTkzfDA&ixlib=rb-4.1.0&q=80&w=1080'
        }
      ]
    });
    
    // Sample maestros (teachers)
    await kv.set('maestros', [
      {
        id: '1',
        name: 'Iván Martín',
        instrument: 'Piano / Dirección',
        bio: 'Director titular de la Orquesta Sinfónica de Burgos y pianista invitado por orquestas como London Philharmonic, Konzerthausorchester Berlin, Wiener Kammerorchester y Orchestre de Paris; ha actuado en salas como Concertgebouw, Carnegie Hall y Berliner Philharmonie. Sus grabaciones con Warner y Sony, y su álbum para Orchid Classics (⭐️⭐️⭐️⭐️⭐️ en BBC Music Magazine), avalan su perfil de referencia.',
        institution: 'Orquesta Sinfónica de Burgos',
        country: 'España',
        role: 'Director Artístico',
        image: 'https://tjbdedlujgjrnxazvpxa.supabase.co/storage/v1/object/public/maestros-images/ivan.jpg',
        featured: true,
        order: 1
      },
      {
        id: '2',
        name: 'Sheila Gómez',
        instrument: 'Violín',
        bio: 'Concertino y solista con la Orquesta Sinfónica de Burgos, con colaboraciones en la Orquesta Nacional de España, RTVE y Castilla y León. Integra el Galdós Ensemble, realiza grabaciones para Warner y Deutsche Grammophon, y cofundó la iniciativa pedagógica Violinada en Castilla y León.',
        institution: 'Orquesta Sinfónica de Burgos',
        country: 'España',
        role: 'Concertino',
        image: 'https://tjbdedlujgjrnxazvpxa.supabase.co/storage/v1/object/public/maestros-images/sheila.jpg',
        featured: true,
        order: 2
      },
      {
        id: '3',
        name: 'Diana Domínguez',
        instrument: 'Violín',
        bio: 'Premio Extraordinario en violín y trayectoria en la OSCyL; hoy compagina escenario y docencia como profesora del Conservatorio Profesional de Salamanca. Su enfoque integra técnica, preparación escénica y herramientas de mindfulness para el rendimiento musical.',
        institution: 'Conservatorio Profesional de Salamanca',
        country: 'España',
        role: 'Profesora',
        image: 'https://tjbdedlujgjrnxazvpxa.supabase.co/storage/v1/object/public/maestros-images/diana.jpg',
        featured: true,
        order: 3
      },
      {
        id: '4',
        name: 'Marta Roca',
        instrument: 'Violín',
        bio: 'Formada en la E.S.M. Reina Sofía (Madrid) y Meadows School of Arts (Dallas), fue miembro de Camerata Bariloche y concertino invitada en proyectos en Europa y América. Ha grabado Montsalvatge, Messiaen, Takemitsu y Milhaud; hoy es catedrática de Música de Cámara y Cuarteto en el Conservatorio Superior de Castilla y León.',
        institution: 'Conservatorio Superior de Castilla y León',
        country: 'España',
        role: 'Catedrática',
        image: 'https://tjbdedlujgjrnxazvpxa.supabase.co/storage/v1/object/public/maestros-images/marta.jpg',
        featured: true,
        order: 4
      },
      {
        id: '5',
        name: 'David Santacecilia',
        instrument: 'Violín',
        bio: 'Profesor de violín y armonía en el Conservatorio Amaniel (Madrid), líder del grupo historicista Exordium Musicae (Auditorio Nacional, Palacio Real) y Premio de Honor Fin de Carrera (RCSMM). Grabó la primera versión moderna de tríos de Gaetano Brunetti para la Sociedad Española de Musicología y firma investigación musicológica publicada en Quodlibet.',
        institution: 'Conservatorio Amaniel',
        country: 'España',
        role: 'Profesor',
        image: 'https://tjbdedlujgjrnxazvpxa.supabase.co/storage/v1/object/public/maestros-images/david.jpg',
        featured: true,
        order: 5
      },
      {
        id: '6',
        name: 'Mikel Zunzundegui',
        instrument: 'Violonchelo',
        bio: 'Ha sido parte de EUYO y de destacadas orquestas españolas; actuó en el Wiener Musikverein y el Tokyo Metropolitan Art Space. Actualmente es ayuda de solista en la Orquesta Sinfónica de Burgos y dirige las Jornadas de Violonchelo Cellocyl en Castilla y León.',
        institution: 'Orquesta Sinfónica de Burgos',
        country: 'España',
        role: 'Ayuda de Solista',
        image: 'https://tjbdedlujgjrnxazvpxa.supabase.co/storage/v1/object/public/maestros-images/mikel.jpg',
        featured: true,
        order: 6
      },
      {
        id: '7',
        name: 'Julia Wasmund',
        instrument: 'Violonchelo',
        bio: 'Violochelista solista de la Filarmónica de Ulm y profesora en la Universidad de Música de Münster. Ganadora de Concurso Internacional David Popper (Hungría), Ouro Branco (Brasil) y Sant\'Alfonso (Italia), con actividad como solista y en conjuntos de música contemporánea y barroca.',
        institution: 'Filarmónica de Ulm',
        country: 'Alemania',
        role: 'Solista',
        image: 'https://tjbdedlujgjrnxazvpxa.supabase.co/storage/v1/object/public/maestros-images/julia.jpg',
        featured: true,
        order: 7
      },
      {
        id: '8',
        name: 'Victoria Saldarini',
        instrument: 'Violonchelo',
        bio: 'Bachelor con máximas calificaciones (Conservatorios G. Verdi de Turín y Milán) y Master of Performance con distinción (Musikhochschule Münster). Integró la Orchestra Giovanile Italiana, colabora con Orchestra Milano Classica y enseña en Italia y Alemania; recitales en la Embajada de Italia en Mongolia y el Consulado de Italia en Belo Horizonte.',
        institution: 'Orchestra Milano Classica',
        country: 'Italia/Bélgica',
        role: 'Cellista',
        image: 'https://tjbdedlujgjrnxazvpxa.supabase.co/storage/v1/object/public/maestros-images/victoria.jpg',
        featured: true,
        order: 8
      },
      {
        id: '9',
        name: 'Fabio Presgrave',
        instrument: 'Violonchelo',
        bio: 'Formado en la Juilliard School (Nueva York), solista con la Filarmónica de Qatar y principales orquestas brasileñas; Premio Carlos Gomes (2006) y reconocimientos de la crítica por su sonido y musicalidad. Profesor e investigador en UFRN, con masterclasses en academias europeas y latinoamericanas.',
        institution: 'Juilliard School / UFRN',
        country: 'Brasil',
        role: 'Solista y Profesor',
        image: 'https://tjbdedlujgjrnxazvpxa.supabase.co/storage/v1/object/public/maestros-images/fabio.jpg',
        featured: true,
        order: 9
      }
    ]);

    // Sample noticias (news)
    await kv.set('noticias', [
      {
        id: '1',
        title: 'Convocatoria Abierta 2026',
        slug: 'convocatoria-abierta-2026',
        excerpt: 'Ya están abiertas las audiciones para la próxima edición de Semana de las Cuerdas.',
        content: 'Nos complace anunciar que las audiciones para Semana de las Cuerdas 2026 están oficialmente abiertas. Este año recibiremos a músicos destacados de toda Latinoamérica para una semana intensiva de formación con maestros internacionales.',
        category: 'audiciones',
        date: '2025-02-15',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200',
        featured: true,
        published: true
      },
      {
        id: '2',
        title: 'Masterclass con Elena Reyes',
        slug: 'masterclass-elena-reyes',
        excerpt: 'La primera violinista de la Filarmónica de Berlín ofrecerá masterclasses exclusivas.',
        content: 'Elena Reyes, primera violinista de la prestigiosa Orquesta Filarmónica de Berlín, se unirá a nuestro faculty para ofrecer masterclasses enfocadas en técnica avanzada y expresión musical.',
        category: 'maestros',
        date: '2025-01-28',
        image: 'https://images.unsplash.com/photo-1465847899386-bbfb50c78ebb?w=1200',
        featured: true,
        published: true
      },
      {
        id: '3',
        title: 'Becas Completas Disponibles',
        slug: 'becas-completas-disponibles',
        excerpt: 'Gracias a nuestros donantes, ofrecemos 10 becas completas para jóvenes talentos.',
        content: 'La Fundación Vivat ha destinado recursos para otorgar 10 becas completas que cubren matrícula, alojamiento y alimentación durante toda la semana del programa.',
        category: 'becas',
        date: '2025-02-01',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200',
        featured: false,
        published: true
      }
    ]);

    // Sample ediciones (past editions)
    await kv.set('ediciones', [
      {
        id: '1',
        year: 2025,
        theme: 'Explorando Fronteras Musicales',
        participants: 48,
        countries: 12,
        concerts: 5,
        description: 'La edición 2025 reunió a jóvenes talentos de toda Latinoamérica para una semana intensiva de formación con maestros de las principales orquestas europeas.',
        highlights: [
          'Concierto final en el Teatro Nacional',
          '15 masterclasses magistrales',
          'Sesiones de música de cámara',
          'Clases individuales con maestros internacionales'
        ],
        images: [
          'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
          'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800',
          'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800'
        ],
        featured: true
      },
      {
        id: '2',
        year: 2024,
        theme: 'Tradición y Vanguardia',
        participants: 42,
        countries: 10,
        concerts: 4,
        description: 'Enfoque en el repertorio latinoamericano y su diálogo con las grandes obras del repertorio clásico universal.',
        highlights: [
          'Estreno de obras de compositores latinoamericanos',
          'Colaboración con la Orquesta Sinfónica Nacional',
          '12 masterclasses',
          'Grabación profesional de sesiones'
        ],
        images: [
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
          'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800'
        ],
        featured: false
      }
    ]);

    // Sample testimonios (testimonials)
    await kv.set('testimonios', [
      {
        id: '1',
        author: 'María Fernanda Gómez',
        role: 'Violinista',
        year: 2025,
        country: 'Colombia',
        quote: 'Semana de las Cuerdas cambió mi perspectiva sobre la música. Las clases con maestros de este nivel me prepararon para audicionar en conservatorios europeos.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        featured: true
      },
      {
        id: '2',
        author: 'Carlos Mendoza',
        role: 'Cellista',
        year: 2024,
        country: 'Argentina',
        quote: 'La experiencia más transformadora de mi carrera musical. Los maestros no solo enseñan técnica, sino que inspiran una visión artística profunda.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        featured: true
      },
      {
        id: '3',
        author: 'Ana Lucía Torres',
        role: 'Violista',
        year: 2025,
        country: 'México',
        quote: 'Recibir una beca completa me permitió vivir esta experiencia única. Ahora estudio en el Conservatorio de París gracias a lo aprendido aquí.',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
        featured: true
      }
    ]);

    // Home page content - MULTILINGUAL
    await kv.set('home_content', {
      es: {
        hero: {
          title: 'Acelera tu trayectoria artística',
          subtitle: '7 días intensivos con maestros internacionales de élite.',
          description: 'Clases 1:1, música de cámara, y proyección profesional.',
          backgroundImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1920&q=80'
        },
        video: {
          title: 'Descubre la experiencia',
          description: 'Un vistazo al nivel artístico y la intensidad de Semana de las Cuerdas',
          vimeoId: '1168117010',
          vimeoUrl: 'https://vimeo.com/1168117010'
        },
        whatWeOffer: {
          title: 'Una experiencia de alto impacto',
          subtitle: 'No buscamos crear un evento bonito. Creamos una plataforma de transformación artística que acelera tu carrera hacia el nivel internacional.'
        },
        testimonials: {
          title: 'Lo que dicen nuestros músicos',
          items: [
            {
              id: '1',
              quote: 'Esta semana transformó mi manera de entender la música. El nivel de exigencia y la calidad de los maestros superó todas mis expectativas.',
              author: 'Ana Sofía Martínez',
              role: 'Violinista, 19 años'
            },
            {
              id: '2',
              quote: 'No es solo una masterclass, es una experiencia que acelera tu carrera. Aquí conocí a maestros que cambiaron mi perspectiva artística.',
              author: 'Mateo Rendón',
              role: 'Cellista, 22 años'
            }
          ]
        },
        cta: {
          title: '¿Estás listo para el siguiente nivel?',
          subtitle: 'Las audiciones para la próxima edición están abiertas.',
          description: 'Becas disponibles para talentos excepcionales.'
        }
      },
      en: {
        hero: {
          title: 'Accelerate your artistic trajectory',
          subtitle: '7 intensive days with elite international masters.',
          description: '1:1 lessons, chamber music, and professional development.',
          backgroundImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1920&q=80'
        },
        video: {
          title: 'Discover the experience',
          description: 'A glimpse into the artistic level and intensity of Semana de las Cuerdas',
          vimeoId: '1168117010',
          vimeoUrl: 'https://vimeo.com/1168117010'
        },
        whatWeOffer: {
          title: 'A high-impact experience',
          subtitle: 'We don\'t seek to create a nice event. We create a platform for artistic transformation that accelerates your career towards the international level.'
        },
        testimonials: {
          title: 'What our musicians say',
          items: [
            {
              id: '1',
              quote: 'This week transformed my understanding of music. The level of rigor and quality of the teachers exceeded all my expectations.',
              author: 'Ana Sofía Martínez',
              role: 'Violinist, 19 years old'
            },
            {
              id: '2',
              quote: 'It\'s not just a masterclass, it\'s an experience that accelerates your career. Here I met teachers who changed my artistic perspective.',
              author: 'Mateo Rendón',
              role: 'Cellist, 22 years old'
            }
          ]
        },
        cta: {
          title: 'Are you ready for the next level?',
          subtitle: 'Auditions for the next edition are open.',
          description: 'Scholarships available for exceptional talents.'
        }
      },
      pt: {
        hero: {
          title: 'Acelere sua trajetória artística',
          subtitle: '7 dias intensivos com mestres internacionais de elite.',
          description: 'Aulas 1:1, música de câmara e projeção profissional.',
          backgroundImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1920&q=80'
        },
        video: {
          title: 'Descubra a experiência',
          description: 'Um vislumbre do nível artístico e intensidade da Semana de las Cuerdas',
          vimeoId: '1168117010',
          vimeoUrl: 'https://vimeo.com/1168117010'
        },
        whatWeOffer: {
          title: 'Uma experiência de alto impacto',
          subtitle: 'Não buscamos criar um evento bonito. Criamos uma plataforma de transformação artística que acelera sua carreira rumo ao nível internacional.'
        },
        testimonials: {
          title: 'O que dizem nossos músicos',
          items: [
            {
              id: '1',
              quote: 'Esta semana transformou minha compreensão da música. O nível de exigência e a qualidade dos professores superou todas as minhas expectativas.',
              author: 'Ana Sofía Martínez',
              role: 'Violinista, 19 anos'
            },
            {
              id: '2',
              quote: 'Não é apenas uma masterclass, é uma experiência que acelera sua carreira. Aqui conheci professores que mudaram minha perspectiva artística.',
              author: 'Mateo Rendón',
              role: 'Violoncelista, 22 anos'
            }
          ]
        },
        cta: {
          title: 'Você está pronto para o próximo nível?',
          subtitle: 'As audições para a próxima edição estão abertas.',
          description: 'Bolsas disponíveis para talentos excepcionais.'
        }
      }
    });

    // Sample galeria (gallery)
    await kv.set('galeria', [
      {
        id: '1',
        title: 'Concierto Final 2025',
        type: 'image',
        category: 'conciertos',
        url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200',
        year: 2025,
        featured: true
      },
      {
        id: '2',
        title: 'Masterclass de Violín',
        type: 'video',
        category: 'masterclasses',
        url: 'https://vimeo.com/1168117010',
        year: 2025,
        featured: true
      },
      {
        id: '3',
        title: 'Sesión de Música de Cámara',
        type: 'image',
        category: 'ensayos',
        url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1200',
        year: 2025,
        featured: false
      },
      {
        id: '4',
        title: 'Recital de Estudiantes',
        type: 'image',
        category: 'conciertos',
        url: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1200',
        year: 2025,
        featured: false
      },
      {
        id: '5',
        title: 'Ensayo de Orquesta',
        type: 'image',
        category: 'ensayos',
        url: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1200',
        year: 2024,
        featured: false
      }
    ]);

    // El Programa page content - MULTILINGUAL
    await kv.set('programa_content', {
      es: {
        hero: {
          title: 'Un programa diseñado para la excelencia',
          subtitle: 'Formación intensiva que transforma talento en carrera profesional'
        },
        structure: {
          title: 'Estructura del programa',
          items: [
            {
              id: '1',
              title: 'Clases Individuales',
              description: 'Mínimo 3 sesiones individuales con maestros de orquestas internacionales',
              icon: 'user'
            },
            {
              id: '2',
              title: 'Música de Cámara',
              description: 'Trabajo intensivo en grupos pequeños con coaching profesional',
              icon: 'users'
            },
            {
              id: '3',
              title: 'Masterclasses',
              description: 'Clases magistrales abiertas con análisis de repertorio',
              icon: 'book'
            },
            {
              id: '4',
              title: 'Concierto Final',
              description: 'Presentación pública del trabajo realizado durante la semana',
              icon: 'music'
            }
          ]
        },
        benefits: {
          title: '¿Qué te llevas?',
          items: [
            'Retroalimentación personalizada de maestros de élite',
            'Red de contactos con músicos de toda Latinoamérica',
            'Certificado de participación reconocido internacionalmente',
            'Grabaciones profesionales de tus interpretaciones',
            'Cartas de recomendación de maestros internacionales'
          ]
        },
        schedule: {
          title: 'Horario tipo',
          description: 'Cada día está diseñado para maximizar tu aprendizaje',
          daily: '9:00 AM - 10:00 PM con pausas para comidas'
        }
      },
      en: {
        hero: {
          title: 'A program designed for excellence',
          subtitle: 'Intensive training that transforms talent into professional career'
        },
        structure: {
          title: 'Program structure',
          items: [
            {
              id: '1',
              title: 'Individual Lessons',
              description: 'Minimum 3 individual sessions with international orchestra masters',
              icon: 'user'
            },
            {
              id: '2',
              title: 'Chamber Music',
              description: 'Intensive work in small groups with professional coaching',
              icon: 'users'
            },
            {
              id: '3',
              title: 'Masterclasses',
              description: 'Open masterclasses with repertoire analysis',
              icon: 'book'
            },
            {
              id: '4',
              title: 'Final Concert',
              description: 'Public presentation of the work done during the week',
              icon: 'music'
            }
          ]
        },
        benefits: {
          title: 'What do you get?',
          items: [
            'Personalized feedback from elite masters',
            'Network with musicians from all over Latin America',
            'Internationally recognized certificate of participation',
            'Professional recordings of your performances',
            'Recommendation letters from international teachers'
          ]
        },
        schedule: {
          title: 'Typical schedule',
          description: 'Each day is designed to maximize your learning',
          daily: '9:00 AM - 10:00 PM with meal breaks'
        }
      },
      pt: {
        hero: {
          title: 'Um programa projetado para a excelência',
          subtitle: 'Formação intensiva que transforma talento em carreira profissional'
        },
        structure: {
          title: 'Estrutura do programa',
          items: [
            {
              id: '1',
              title: 'Aulas Individuais',
              description: 'Mínimo 3 sessões individuais com mestres de orquestras internacionais',
              icon: 'user'
            },
            {
              id: '2',
              title: 'Música de Câmara',
              description: 'Trabalho intensivo em grupos pequenos com coaching profissional',
              icon: 'users'
            },
            {
              id: '3',
              title: 'Masterclasses',
              description: 'Aulas magistrais abertas com análise de repertório',
              icon: 'book'
            },
            {
              id: '4',
              title: 'Concerto Final',
              description: 'Apresentação pública do trabalho realizado durante a semana',
              icon: 'music'
            }
          ]
        },
        benefits: {
          title: 'O que você leva?',
          items: [
            'Feedback personalizado de mestres de elite',
            'Rede de contatos com músicos de toda a América Latina',
            'Certificado de participação reconhecido internacionalmente',
            'Gravações profissionais de suas interpretações',
            'Cartas de recomendação de professores internacionais'
          ]
        },
        schedule: {
          title: 'Horário típico',
          description: 'Cada dia é projetado para maximizar seu aprendizado',
          daily: '9:00 - 22:00 com pausas para refeições'
        }
      }
    });

    // Impacto page content - MULTILINGUAL
    await kv.set('impacto_content', {
      es: {
        hero: {
          title: 'Transformando vidas a través de la música',
          subtitle: 'Nuestro impacto en números y testimonios'
        },
        stats: [
          { id: '1', number: '250+', label: 'Músicos formados', icon: 'users' },
          { id: '2', number: '15', label: 'Países representados', icon: 'globe' },
          { id: '3', number: '85%', label: 'Continuaron estudios profesionales', icon: 'trending-up' },
          { id: '4', number: '50+', label: 'Becas otorgadas', icon: 'award' }
        ],
        mission: {
          title: 'Nuestra misión',
          content: 'Democratizar el acceso a formación musical de élite para jóvenes talentos latinoamericanos, creando oportunidades que transformen vidas y eleven el nivel artístico de la región.'
        },
        achievements: {
          title: 'Logros destacados',
          items: [
            'Más de 50 exalumnos en conservatorios europeos',
            'Colaboraciones con las principales orquestas de la región',
            '€200,000 en becas otorgadas desde 2020',
            'Red de más de 30 maestros internacionales'
          ]
        }
      },
      en: {
        hero: {
          title: 'Transforming lives through music',
          subtitle: 'Our impact in numbers and testimonials'
        },
        stats: [
          { id: '1', number: '250+', label: 'Musicians trained', icon: 'users' },
          { id: '2', number: '15', label: 'Countries represented', icon: 'globe' },
          { id: '3', number: '85%', label: 'Continued professional studies', icon: 'trending-up' },
          { id: '4', number: '50+', label: 'Scholarships awarded', icon: 'award' }
        ],
        mission: {
          title: 'Our mission',
          content: 'Democratize access to elite musical training for young Latin American talents, creating opportunities that transform lives and elevate the artistic level of the region.'
        },
        achievements: {
          title: 'Notable achievements',
          items: [
            'More than 50 alumni in European conservatories',
            'Collaborations with major orchestras in the region',
            '€200,000 in scholarships awarded since 2020',
            'Network of more than 30 international teachers'
          ]
        }
      },
      pt: {
        hero: {
          title: 'Transformando vidas através da música',
          subtitle: 'Nosso impacto em números e depoimentos'
        },
        stats: [
          { id: '1', number: '250+', label: 'Músicos formados', icon: 'users' },
          { id: '2', number: '15', label: 'Países representados', icon: 'globe' },
          { id: '3', number: '85%', label: 'Continuaram estudos profissionais', icon: 'trending-up' },
          { id: '4', number: '50+', label: 'Bolsas concedidas', icon: 'award' }
        ],
        mission: {
          title: 'Nossa missão',
          content: 'Democratizar o acesso à formação musical de elite para jovens talentos latino-americanos, criando oportunidades que transformam vidas e elevam o nível artístico da região.'
        },
        achievements: {
          title: 'Conquistas destacadas',
          items: [
            'Mais de 50 ex-alunos em conservatórios europeus',
            'Colaborações com as principais orquestras da região',
            '€200.000 em bolsas concedidas desde 2020',
            'Rede de mais de 30 professores internacionais'
          ]
        }
      }
    });

    // Fundacion page content - MULTILINGUAL
    await kv.set('fundacion_content', {
      es: {
        hero: {
          title: 'Fundación Vivat',
          subtitle: 'Impulsando la excelencia musical en Latinoamérica'
        },
        about: {
          title: 'Quiénes somos',
          content: 'La Fundación Vivat nace en 2020 con la convicción de que el talento musical no debe limitarse por barreras económicas. Creemos en la música como herramienta de transformación social y desarrollo profesional.'
        },
        vision: {
          title: 'Nuestra visión',
          content: 'Ser el referente latinoamericano en formación musical de élite, creando un puente entre el talento regional y las oportunidades internacionales.'
        },
        team: {
          title: 'Equipo directivo',
          members: [
            {
              id: '1',
              name: 'María González',
              role: 'Directora Ejecutiva',
              bio: 'Violinista y gestora cultural con 15 años de experiencia'
            },
            {
              id: '2',
              name: 'Carlos Méndez',
              role: 'Director Artístico',
              bio: 'Cellista de la Orquesta Sinfónica Nacional'
            }
          ]
        }
      },
      en: {
        hero: {
          title: 'Vivat Foundation',
          subtitle: 'Driving musical excellence in Latin America'
        },
        about: {
          title: 'Who we are',
          content: 'The Vivat Foundation was born in 2020 with the conviction that musical talent should not be limited by economic barriers. We believe in music as a tool for social transformation and professional development.'
        },
        vision: {
          title: 'Our vision',
          content: 'To be the Latin American reference in elite musical training, creating a bridge between regional talent and international opportunities.'
        },
        team: {
          title: 'Management team',
          members: [
            {
              id: '1',
              name: 'María González',
              role: 'Executive Director',
              bio: 'Violinist and cultural manager with 15 years of experience'
            },
            {
              id: '2',
              name: 'Carlos Méndez',
              role: 'Artistic Director',
              bio: 'Cellist of the National Symphony Orchestra'
            }
          ]
        }
      },
      pt: {
        hero: {
          title: 'Fundação Vivat',
          subtitle: 'Impulsionando a excelência musical na América Latina'
        },
        about: {
          title: 'Quem somos',
          content: 'A Fundação Vivat nasce em 2020 com a convicção de que o talento musical não deve ser limitado por barreiras econômicas. Acreditamos na música como ferramenta de transformação social e desenvolvimento profissional.'
        },
        vision: {
          title: 'Nossa visão',
          content: 'Ser a referência latino-americana em formação musical de elite, criando uma ponte entre o talento regional e as oportunidades internacionais.'
        },
        team: {
          title: 'Equipe diretiva',
          members: [
            {
              id: '1',
              name: 'María González',
              role: 'Diretora Executiva',
              bio: 'Violinista e gestora cultural com 15 anos de experiência'
            },
            {
              id: '2',
              name: 'Carlos Méndez',
              role: 'Diretor Artístico',
              bio: 'Violoncelista da Orquestra Sinfônica Nacional'
            }
          ]
        }
      }
    });

    // Apoya page content - MULTILINGUAL
    await kv.set('apoya_content', {
      es: {
        hero: {
          title: 'Tu apoyo cambia vidas',
          subtitle: 'Ayúdanos a seguir ofreciendo becas y oportunidades'
        },
        impact: {
          title: 'El impacto de tu donación',
          items: [
            {
              id: '1',
              amount: '€100',
              description: 'Materiales de estudio para un participante'
            },
            {
              id: '2',
              amount: '€500',
              description: 'Beca parcial cubriendo alojamiento'
            },
            {
              id: '3',
              amount: '€2000',
              description: 'Beca completa para un joven músico'
            }
          ]
        },
        why: {
          title: '¿Por qué donar?',
          content: 'El 80% de nuestros participantes necesita apoyo financiero. Tu donación hace posible que jóvenes talentos accedan a formación que de otro modo sería inalcanzable.'
        },
        recognition: {
          title: 'Reconocimiento a donantes',
          content: 'Los donantes son reconocidos en nuestros programas de concierto y página web según el nivel de contribución.'
        }
      },
      en: {
        hero: {
          title: 'Your support changes lives',
          subtitle: 'Help us continue offering scholarships and opportunities'
        },
        impact: {
          title: 'The impact of your donation',
          items: [
            {
              id: '1',
              amount: '€100',
              description: 'Study materials for one participant'
            },
            {
              id: '2',
              amount: '€500',
              description: 'Partial scholarship covering accommodation'
            },
            {
              id: '3',
              amount: '€2000',
              description: 'Full scholarship for a young musician'
            }
          ]
        },
        why: {
          title: 'Why donate?',
          content: '80% of our participants need financial support. Your donation makes it possible for young talents to access training that would otherwise be unattainable.'
        },
        recognition: {
          title: 'Donor recognition',
          content: 'Donors are recognized in our concert programs and website according to contribution level.'
        }
      },
      pt: {
        hero: {
          title: 'Seu apoio muda vidas',
          subtitle: 'Ajude-nos a continuar oferecendo bolsas e oportunidades'
        },
        impact: {
          title: 'O impacto da sua doação',
          items: [
            {
              id: '1',
              amount: '€100',
              description: 'Materiais de estudo para um participante'
            },
            {
              id: '2',
              amount: '€500',
              description: 'Bolsa parcial cobrindo hospedagem'
            },
            {
              id: '3',
              amount: '€2000',
              description: 'Bolsa completa para um jovem músico'
            }
          ]
        },
        why: {
          title: 'Por que doar?',
          content: '80% dos nossos participantes precisam de apoio financeiro. Sua doação torna possível que jovens talentos acessem formação que de outra forma seria inalcançável.'
        },
        recognition: {
          title: 'Reconhecimento aos doadores',
          content: 'Os doadores são reconhecidos em nossos programas de concerto e site de acordo com o nível de contribuição.'
        }
      }
    });

    // Maestros page content - MULTILINGUAL
    await kv.set('maestros_content', {
      es: {
        hero: {
          title: 'Maestros',
          subtitle: 'Músicos de élite internacional comprometidos con la formación de la próxima generación. Cada año seleccionamos cuidadosamente a profesores que combinan excelencia artística con vocación pedagógica profunda.'
        },
        philosophy: {
          title: 'Nuestra filosofía pedagógica',
          values: [
            {
              id: '1',
              title: 'Excelencia sin concesiones',
              description: 'Nuestros maestros trabajan en las orquestas y conservatorios más prestigiosos del mundo. Traen estándares internacionales reales.'
            },
            {
              id: '2',
              title: 'Pedagogía humanista',
              description: 'La exigencia artística se combina con cercanía, respeto y construcción de confianza. Los maestros son mentores, no jueces.'
            },
            {
              id: '3',
              title: 'Compromiso con la formación',
              description: 'Cada maestro invierte tiempo, energía y pasión en el crecimiento de cada estudiante. Esto no es un trabajo: es una misión.'
            }
          ]
        },
        selection: {
          title: 'Cómo seleccionamos a nuestros maestros',
          criteria: [
            {
              id: '1',
              title: 'Excelencia artística comprobada',
              description: 'Posición en orquestas de categoría A, carrera solística internacional, o trayectoria pedagógica en conservatorios de élite.'
            },
            {
              id: '2',
              title: 'Vocación pedagógica real',
              description: 'No basta con ser buen músico. Buscamos maestros que disfrutan enseñar, que conectan con jóvenes, y que invierten emocionalmente en el crecimiento de sus estudiantes.'
            },
            {
              id: '3',
              title: 'Compromiso con el proyecto',
              description: 'Los maestros participan en la totalidad de la semana: clases, coaching de cámara, talleres, recitales. No son visitantes, son parte integral de la comunidad.'
            },
            {
              id: '4',
              title: 'Diversidad y complementariedad',
              description: 'Buscamos diversidad geográfica, estilística y pedagógica. Cada maestro aporta una perspectiva única que enriquece la experiencia colectiva.'
            }
          ]
        },
        testimonial: {
          quote: 'Lo que más valoro de Semana de las Cuerdas es la intensidad del compromiso. Los estudiantes llegan preparados, abiertos, hambrientos de aprender. Como maestro, es un privilegio trabajar con ese nivel de entrega.',
          author: 'Elena Reyes',
          role: 'Concertino, Berlin Philharmonic'
        },
        cta: {
          title: 'Trabaja con los mejores',
          description: 'Una semana de clases 1:1 con maestros de este nivel puede transformar tu trayectoria.',
          buttonText: 'Audiciona ahora'
        }
      },
      en: {
        hero: {
          title: 'Teachers',
          subtitle: 'International elite musicians committed to training the next generation. Each year we carefully select teachers who combine artistic excellence with deep pedagogical vocation.'
        },
        philosophy: {
          title: 'Our pedagogical philosophy',
          values: [
            {
              id: '1',
              title: 'Excellence without compromise',
              description: "Our teachers work in the world's most prestigious orchestras and conservatories. They bring real international standards."
            },
            {
              id: '2',
              title: 'Humanistic pedagogy',
              description: 'Artistic demands are combined with closeness, respect and building trust. Teachers are mentors, not judges.'
            },
            {
              id: '3',
              title: 'Commitment to education',
              description: "Each teacher invests time, energy and passion in each student's growth. This is not a job: it's a mission."
            }
          ]
        },
        selection: {
          title: 'How we select our teachers',
          criteria: [
            {
              id: '1',
              title: 'Proven artistic excellence',
              description: 'Position in category A orchestras, international solo career, or pedagogical trajectory in elite conservatories.'
            },
            {
              id: '2',
              title: 'Real pedagogical vocation',
              description: 'Being a good musician is not enough. We look for teachers who enjoy teaching, who connect with young people, and who invest emotionally in their students\' growth.'
            },
            {
              id: '3',
              title: 'Commitment to the project',
              description: 'Teachers participate in the entire week: classes, chamber coaching, workshops, recitals. They are not visitors, they are an integral part of the community.'
            },
            {
              id: '4',
              title: 'Diversity and complementarity',
              description: 'We seek geographic, stylistic and pedagogical diversity. Each teacher brings a unique perspective that enriches the collective experience.'
            }
          ]
        },
        testimonial: {
          quote: "What I value most about String Week is the intensity of commitment. Students arrive prepared, open, hungry to learn. As a teacher, it's a privilege to work with that level of dedication.",
          author: 'Elena Reyes',
          role: 'Concertmaster, Berlin Philharmonic'
        },
        cta: {
          title: 'Work with the best',
          description: 'A week of 1:1 classes with teachers of this caliber can transform your career.',
          buttonText: 'Audition now'
        }
      },
      pt: {
        hero: {
          title: 'Professores',
          subtitle: 'Músicos de elite internacional comprometidos com a formação da próxima geração. A cada ano selecionamos cuidadosamente professores que combinam excelência artística com profunda vocação pedagógica.'
        },
        philosophy: {
          title: 'Nossa filosofia pedagógica',
          values: [
            {
              id: '1',
              title: 'Excelência sem concessões',
              description: 'Nossos professores trabalham nas orquestras e conservatórios mais prestigiados do mundo. Trazem padrões internacionais reais.'
            },
            {
              id: '2',
              title: 'Pedagogia humanista',
              description: 'A exigência artística se combina com proximidade, respeito e construção de confiança. Os professores são mentores, não juízes.'
            },
            {
              id: '3',
              title: 'Compromisso com a formação',
              description: 'Cada professor investe tempo, energia e paixão no crescimento de cada estudante. Isto não é um trabalho: é uma missão.'
            }
          ]
        },
        selection: {
          title: 'Como selecionamos nossos professores',
          criteria: [
            {
              id: '1',
              title: 'Excelência artística comprovada',
              description: 'Posição em orquestras de categoria A, carreira solista internacional, ou trajetória pedagógica em conservatórios de elite.'
            },
            {
              id: '2',
              title: 'Vocação pedagógica real',
              description: 'Não basta ser bom músico. Procuramos professores que gostam de ensinar, que se conectam com jovens, e que investem emocionalmente no crescimento de seus estudantes.'
            },
            {
              id: '3',
              title: 'Compromisso com o projeto',
              description: 'Os professores participam da semana inteira: aulas, coaching de câmara, workshops, recitais. Não são visitantes, são parte integral da comunidade.'
            },
            {
              id: '4',
              title: 'Diversidade e complementaridade',
              description: 'Buscamos diversidade geográfica, estilística e pedagógica. Cada professor traz uma perspectiva única que enriquece a experiência coletiva.'
            }
          ]
        },
        testimonial: {
          quote: 'O que mais valorizo na Semana das Cordas é a intensidade do compromisso. Os estudantes chegam preparados, abertos, famintos por aprender. Como professor, é um privilégio trabalhar com esse nível de dedicação.',
          author: 'Elena Reyes',
          role: 'Concertino, Berlin Philharmonic'
        },
        cta: {
          title: 'Trabalhe com os melhores',
          description: 'Uma semana de aulas 1:1 com professores deste nível pode transformar sua trajetória.',
          buttonText: 'Faça audição agora'
        }
      }
    });

    // Mark tables as initialized
    await kv.set('tables_initialized', true);
    console.log('Content tables initialized successfully');
  } catch (error) {
    console.error('Error initializing tables:', error);
  }
}

// Initialize on startup
initializeTables();
initializeStorage();

// Health check endpoint
app.get("/make-server-65077a1f/health", (c) => {
  return c.json({ status: "ok" });
});

// ==================== AUTH ENDPOINTS ====================

// Create admin user - Use this endpoint once to create your first admin user
// After creating the first user, you can manage users through Supabase dashboard
app.post("/make-server-65077a1f/auth/create-admin", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: 'Email y contraseña son requeridos' }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || 'Admin' },
      // Automatically confirm the user's email since an email server hasn't been configured
      email_confirm: true
    });

    if (error) {
      console.error('Error creating admin user:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      message: 'Usuario administrador creado exitosamente',
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.name
      }
    });
  } catch (error) {
    console.error('Error in create-admin endpoint:', error);
    return c.json({ error: 'Error al crear usuario administrador' }, 500);
  }
});

// ==================== MAESTROS ENDPOINTS ====================

// Get all maestros
app.get("/make-server-65077a1f/maestros", async (c) => {
  try {
    let maestros = await kv.get('maestros') || [];
    
    // Auto-migrate old 'bio' field to 'bio_es', 'bio_en', 'bio_pt'
    let needsMigration = false;
    maestros = maestros.map((maestro: any) => {
      if (maestro.bio && !maestro.bio_es) {
        needsMigration = true;
        return {
          ...maestro,
          bio_es: maestro.bio,
          bio_en: maestro.bio, // Default to Spanish for now
          bio_pt: maestro.bio, // Default to Spanish for now
          bio: undefined, // Remove old field
        };
      }
      return maestro;
    });
    
    // Save migrated data
    if (needsMigration) {
      console.log('⚠️ Migrating maestros data from "bio" to "bio_es/bio_en/bio_pt"');
      await kv.set('maestros', maestros);
    }
    
    return c.json(maestros);
  } catch (error) {
    console.error('Error fetching maestros:', error);
    return c.json({ error: 'Error al obtener maestros' }, 500);
  }
});

// Get single maestro
app.get("/make-server-65077a1f/maestros/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const maestros = await kv.get('maestros') || [];
    const maestro = maestros.find((m: any) => m.id === id);
    
    if (!maestro) {
      return c.json({ error: 'Maestro no encontrado' }, 404);
    }
    
    return c.json(maestro);
  } catch (error) {
    console.error('Error fetching maestro:', error);
    return c.json({ error: 'Error al obtener maestro' }, 500);
  }
});

// Create maestro
app.post("/make-server-65077a1f/maestros", async (c) => {
  try {
    const newMaestro = await c.req.json();
    const maestros = await kv.get('maestros') || [];
    
    // Generate new ID
    const newId = (Math.max(...maestros.map((m: any) => parseInt(m.id) || 0), 0) + 1).toString();
    const maestroWithId = { ...newMaestro, id: newId };
    
    maestros.push(maestroWithId);
    await kv.set('maestros', maestros);
    
    console.log('New maestro created:', maestroWithId);
    
    return c.json(maestroWithId);
  } catch (error) {
    console.error('Error creating maestro:', error);
    return c.json({ error: 'Error al crear maestro' }, 500);
  }
});

// Update maestro
app.put("/make-server-65077a1f/maestros/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    const maestros = await kv.get('maestros') || [];
    
    const index = maestros.findIndex((m: any) => m.id === id);
    if (index === -1) {
      return c.json({ error: 'Maestro no encontrado' }, 404);
    }
    
    maestros[index] = { ...maestros[index], ...updates, id };
    await kv.set('maestros', maestros);
    
    return c.json(maestros[index]);
  } catch (error) {
    console.error('Error updating maestro:', error);
    return c.json({ error: 'Error al actualizar maestro' }, 500);
  }
});

// Delete maestro
app.delete("/make-server-65077a1f/maestros/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const maestros = await kv.get('maestros') || [];
    
    const index = maestros.findIndex((m: any) => m.id === id);
    if (index === -1) {
      return c.json({ error: 'Maestro no encontrado' }, 404);
    }
    
    maestros.splice(index, 1);
    await kv.set('maestros', maestros);
    
    console.log('Maestro deleted:', id);
    
    return c.json({ success: true, message: 'Maestro eliminado exitosamente' });
  } catch (error) {
    console.error('Error deleting maestro:', error);
    return c.json({ error: 'Error al eliminar maestro' }, 500);
  }
});

// ==================== NOTICIAS ENDPOINTS ====================

// Get all noticias
app.get("/make-server-65077a1f/noticias", async (c) => {
  try {
    const noticias = await kv.get('noticias') || [];
    return c.json(noticias);
  } catch (error) {
    console.error('Error fetching noticias:', error);
    return c.json({ error: 'Error al obtener noticias' }, 500);
  }
});

// Get single noticia
app.get("/make-server-65077a1f/noticias/:slug", async (c) => {
  try {
    const slug = c.req.param('slug');
    const noticias = await kv.get('noticias') || [];
    const noticia = noticias.find((n: any) => n.slug === slug);
    
    if (!noticia) {
      return c.json({ error: 'Noticia no encontrada' }, 404);
    }
    
    return c.json(noticia);
  } catch (error) {
    console.error('Error fetching noticia:', error);
    return c.json({ error: 'Error al obtener noticia' }, 500);
  }
});

// ==================== EDICIONES ENDPOINTS ====================

// Get all ediciones
app.get("/make-server-65077a1f/ediciones", async (c) => {
  try {
    const ediciones = await kv.get('ediciones') || [];
    return c.json(ediciones);
  } catch (error) {
    console.error('Error fetching ediciones:', error);
    return c.json({ error: 'Error al obtener ediciones' }, 500);
  }
});

// ==================== TESTIMONIOS ENDPOINTS ====================

// Get all testimonios
app.get("/make-server-65077a1f/testimonios", async (c) => {
  try {
    const testimonios = await kv.get('testimonios') || [];
    return c.json(testimonios);
  } catch (error) {
    console.error('Error fetching testimonios:', error);
    return c.json({ error: 'Error al obtener testimonios' }, 500);
  }
});

// ==================== GALERIA ENDPOINTS ====================

// Get all galeria items
app.get("/make-server-65077a1f/galeria", async (c) => {
  try {
    const category = c.req.query('category');
    const year = c.req.query('year');
    
    let galeria = await kv.get('galeria') || [];
    
    // Filter by category if provided
    if (category) {
      galeria = galeria.filter((item: any) => item.category === category);
    }
    
    // Filter by year if provided
    if (year) {
      galeria = galeria.filter((item: any) => item.year === parseInt(year));
    }
    
    return c.json(galeria);
  } catch (error) {
    console.error('Error fetching galeria:', error);
    return c.json({ error: 'Error al obtener galería' }, 500);
  }
});

// ==================== SITE CONFIG ENDPOINTS ====================

// Get site configuration
app.get("/make-server-65077a1f/config", async (c) => {
  try {
    const config = await kv.get('site_config') || {};
    return c.json(config);
  } catch (error) {
    console.error('Error fetching config:', error);
    return c.json({ error: 'Error al obtener configuración' }, 500);
  }
});

// Update site configuration (admin only in production)
app.put("/make-server-65077a1f/config", async (c) => {
  try {
    const updates = await c.req.json();
    const currentConfig = await kv.get('site_config') || {};
    
    const newConfig = { ...currentConfig, ...updates };
    await kv.set('site_config', newConfig);
    
    console.log('Config updated:', newConfig);
    
    return c.json(newConfig);
  } catch (error) {
    console.error('Error updating config:', error);
    return c.json({ error: 'Error al actualizar configuración' }, 500);
  }
});

// ==================== SITE IMAGES ENDPOINTS ====================

// Get site images
app.get("/make-server-65077a1f/site-images", async (c) => {
  try {
    const images = await kv.get('site_images') || {};
    return c.json(images);
  } catch (error) {
    console.error('Error fetching site images:', error);
    return c.json({ error: 'Error al obtener imágenes' }, 500);
  }
});

// Update site images
app.put("/make-server-65077a1f/site-images", async (c) => {
  try {
    const updates = await c.req.json();
    const currentImages = await kv.get('site_images') || {};
    
    // Special handling for gallery category
    if (updates.category === 'galeria' && updates.items) {
      const newImages = {
        ...currentImages,
        galeria: updates.items
      };
      await kv.set('site_images', newImages);
      console.log('Gallery images updated:', updates.items.length, 'items');
      return c.json(newImages);
    }
    
    // Regular update (merge)
    const newImages = { ...currentImages, ...updates };
    await kv.set('site_images', newImages);
    
    console.log('Site images updated:', Object.keys(newImages));
    
    return c.json(newImages);
  } catch (error) {
    console.error('Error updating site images:', error);
    return c.json({ error: 'Error al actualizar imágenes' }, 500);
  }
});

// ==================== HOME CONTENT ENDPOINTS ====================

// Get home page content
app.get("/make-server-65077a1f/home-content", async (c) => {
  try {
    const content = await kv.get('home_content') || {};
    return c.json(content);
  } catch (error) {
    console.error('Error fetching home content:', error);
    return c.json({ error: 'Error al obtener contenido de home' }, 500);
  }
});

// Update home page content
app.put("/make-server-65077a1f/home-content", async (c) => {
  try {
    const updates = await c.req.json();
    const currentContent = await kv.get('home_content') || {};
    
    const newContent = { ...currentContent, ...updates };
    await kv.set('home_content', newContent);
    
    console.log('Home content updated:', newContent);
    
    return c.json(newContent);
  } catch (error) {
    console.error('Error updating home content:', error);
    return c.json({ error: 'Error al actualizar contenido de home' }, 500);
  }
});

// ==================== PROGRAMA CONTENT ENDPOINTS ====================

// Get programa page content
app.get("/make-server-65077a1f/programa-content", async (c) => {
  try {
    const content = await kv.get('programa_content') || {};
    return c.json(content);
  } catch (error) {
    console.error('Error fetching programa content:', error);
    return c.json({ error: 'Error al obtener contenido de programa' }, 500);
  }
});

// Update programa page content
app.put("/make-server-65077a1f/programa-content", async (c) => {
  try {
    const updates = await c.req.json();
    const currentContent = await kv.get('programa_content') || {};
    
    const newContent = { ...currentContent, ...updates };
    await kv.set('programa_content', newContent);
    
    console.log('Programa content updated:', newContent);
    
    return c.json(newContent);
  } catch (error) {
    console.error('Error updating programa content:', error);
    return c.json({ error: 'Error al actualizar contenido de programa' }, 500);
  }
});

// ==================== IMPACTO CONTENT ENDPOINTS ====================

// Get impacto page content
app.get("/make-server-65077a1f/impacto-content", async (c) => {
  try {
    const content = await kv.get('impacto_content') || {};
    return c.json(content);
  } catch (error) {
    console.error('Error fetching impacto content:', error);
    return c.json({ error: 'Error al obtener contenido de impacto' }, 500);
  }
});

// Update impacto page content
app.put("/make-server-65077a1f/impacto-content", async (c) => {
  try {
    const updates = await c.req.json();
    const currentContent = await kv.get('impacto_content') || {};
    
    const newContent = { ...currentContent, ...updates };
    await kv.set('impacto_content', newContent);
    
    console.log('Impacto content updated:', newContent);
    
    return c.json(newContent);
  } catch (error) {
    console.error('Error updating impacto content:', error);
    return c.json({ error: 'Error al actualizar contenido de impacto' }, 500);
  }
});

// ==================== FUNDACION CONTENT ENDPOINTS ====================

// Get fundacion page content
app.get("/make-server-65077a1f/fundacion-content", async (c) => {
  try {
    const content = await kv.get('fundacion_content') || {};
    return c.json(content);
  } catch (error) {
    console.error('Error fetching fundacion content:', error);
    return c.json({ error: 'Error al obtener contenido de fundacion' }, 500);
  }
});

// Update fundacion page content
app.put("/make-server-65077a1f/fundacion-content", async (c) => {
  try {
    const updates = await c.req.json();
    const currentContent = await kv.get('fundacion_content') || {};
    
    const newContent = { ...currentContent, ...updates };
    await kv.set('fundacion_content', newContent);
    
    console.log('Fundacion content updated:', newContent);
    
    return c.json(newContent);
  } catch (error) {
    console.error('Error updating fundacion content:', error);
    return c.json({ error: 'Error al actualizar contenido de fundacion' }, 500);
  }
});

// ==================== APOYA CONTENT ENDPOINTS ====================

// Get apoya page content
app.get("/make-server-65077a1f/apoya-content", async (c) => {
  try {
    const content = await kv.get('apoya_content') || {};
    return c.json(content);
  } catch (error) {
    console.error('Error fetching apoya content:', error);
    return c.json({ error: 'Error al obtener contenido de apoya' }, 500);
  }
});

// Update apoya page content
app.put("/make-server-65077a1f/apoya-content", async (c) => {
  try {
    const updates = await c.req.json();
    const currentContent = await kv.get('apoya_content') || {};
    
    const newContent = { ...currentContent, ...updates };
    await kv.set('apoya_content', newContent);
    
    console.log('Apoya content updated:', newContent);
    
    return c.json(newContent);
  } catch (error) {
    console.error('Error updating apoya content:', error);
    return c.json({ error: 'Error al actualizar contenido de apoya' }, 500);
  }
});

// Get maestros page content
app.get("/make-server-65077a1f/maestros-content", async (c) => {
  try {
    const content = await kv.get('maestros_content') || {};
    return c.json(content);
  } catch (error) {
    console.error('Error fetching maestros content:', error);
    return c.json({ error: 'Error al obtener contenido de maestros' }, 500);
  }
});

// Update maestros page content
app.put("/make-server-65077a1f/maestros-content", async (c) => {
  try {
    const updates = await c.req.json();
    const currentContent = await kv.get('maestros_content') || {};
    
    const newContent = { ...currentContent, ...updates };
    await kv.set('maestros_content', newContent);
    
    console.log('Maestros content updated:', newContent);
    
    return c.json(newContent);
  } catch (error) {
    console.error('Error updating maestros content:', error);
    return c.json({ error: 'Error al actualizar contenido de maestros' }, 500);
  }
});

// Admin endpoint to force re-initialization of all data
app.post("/make-server-65077a1f/admin/force-init", async (c) => {
  try {
    console.log('🔄 Force re-initialization requested');
    
    // Clear the initialization flag
    await kv.del('tables_initialized');
    
    // Re-run initialization
    await initializeTables();
    
    return c.json({ 
      success: true, 
      message: 'Datos inicializados correctamente' 
    });
  } catch (error: any) {
    console.error('Error forcing initialization:', error);
    return c.json({ 
      error: 'Error al inicializar datos', 
      details: error.message 
    }, 500);
  }
});

// ==================== FORM SUBMISSIONS ====================

// Submit audition form
app.post("/make-server-65077a1f/audiciones/submit", async (c) => {
  try {
    const formData = await c.req.json();
    
    // Get existing submissions
    const submissions = await kv.get('audicion_submissions') || [];
    
    // Add new submission with timestamp and ID
    const newSubmission = {
      id: Date.now().toString(),
      ...formData,
      submittedAt: new Date().toISOString()
    };
    
    submissions.push(newSubmission);
    await kv.set('audicion_submissions', submissions);
    
    console.log('New audition submission:', newSubmission);
    
    return c.json({ 
      success: true, 
      message: 'Audición enviada exitosamente',
      submissionId: newSubmission.id
    });
  } catch (error) {
    console.error('Error submitting audition:', error);
    return c.json({ error: 'Error al enviar audición' }, 500);
  }
});

// Submit contact form
app.post("/make-server-65077a1f/contacto/submit", async (c) => {
  try {
    const formData = await c.req.json();
    
    // Get existing messages
    const messages = await kv.get('contact_messages') || [];
    
    // Add new message with timestamp and ID
    const newMessage = {
      id: Date.now().toString(),
      ...formData,
      submittedAt: new Date().toISOString(),
      read: false
    };
    
    messages.push(newMessage);
    await kv.set('contact_messages', messages);
    
    console.log('New contact message:', newMessage);
    
    return c.json({ 
      success: true, 
      message: 'Mensaje enviado exitosamente',
      messageId: newMessage.id
    });
  } catch (error) {
    console.error('Error submitting contact:', error);
    return c.json({ error: 'Error al enviar mensaje' }, 500);
  }
});

// Submit donation
app.post("/make-server-65077a1f/donaciones/submit", async (c) => {
  try {
    const donationData = await c.req.json();
    
    // Get existing donations
    const donations = await kv.get('donations') || [];
    
    // Add new donation with timestamp and ID
    const newDonation = {
      id: Date.now().toString(),
      ...donationData,
      submittedAt: new Date().toISOString(),
      status: 'pending' // In production, this would integrate with payment gateway
    };
    
    donations.push(newDonation);
    await kv.set('donations', donations);
    
    console.log('New donation:', newDonation);
    
    return c.json({ 
      success: true, 
      message: 'Donación registrada exitosamente',
      donationId: newDonation.id
    });
  } catch (error) {
    console.error('Error submitting donation:', error);
    return c.json({ error: 'Error al procesar donación' }, 500);
  }
});

// Submit waitlist signup (for when auditions are closed)
app.post("/make-server-65077a1f/waitlist/submit", async (c) => {
  try {
    const { email, name, instrument } = await c.req.json();
    
    // Get existing waitlist
    const waitlist = await kv.get('audition_waitlist') || [];
    
    // Check if email already exists
    const exists = waitlist.some((entry: any) => entry.email === email);
    if (exists) {
      return c.json({ 
        success: true, 
        message: 'Ya estás registrado en la lista de espera'
      });
    }
    
    // Add new entry
    const newEntry = {
      id: Date.now().toString(),
      email,
      name,
      instrument,
      submittedAt: new Date().toISOString()
    };
    
    waitlist.push(newEntry);
    await kv.set('audition_waitlist', waitlist);
    
    console.log('New waitlist entry:', newEntry);
    
    return c.json({ 
      success: true, 
      message: 'Te avisaremos cuando se abran las audiciones',
      entryId: newEntry.id
    });
  } catch (error) {
    console.error('Error submitting waitlist:', error);
    return c.json({ error: 'Error al registrar en lista de espera' }, 500);
  }
});

// ==================== IMAGE UPLOAD ENDPOINT ====================

// Upload image to Supabase Storage
app.post("/make-server-65077a1f/upload-image", async (c) => {
  try {
    console.log('=== Upload Image Request Started ===');
    
    const body = await c.req.json();
    const { file: base64Data, filename, contentType, category = 'general' } = body;
    
    console.log('Request data:', { 
      filename, 
      contentType, 
      category,
      base64Length: base64Data?.length 
    });
    
    if (!base64Data || !filename || !contentType) {
      console.error('Missing required fields');
      return c.json({ error: 'Missing required fields: file, filename, or contentType' }, 400);
    }
    
    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(contentType)) {
      console.error('Invalid file type:', contentType);
      return c.json({ error: 'Invalid file type. Only PNG, JPEG, GIF, and WebP are allowed.' }, 400);
    }
    
    // Convert base64 to Uint8Array
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    console.log('File converted to buffer, size:', bytes.length);
    
    // Validate file size (10MB max)
    if (bytes.length > 10485760) {
      console.error('File too large:', bytes.length);
      return c.json({ error: 'File size exceeds 10MB limit' }, 400);
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const extension = filename.split('.').pop();
    const uniqueFilename = `${category}/${timestamp}-${randomString}.${extension}`;
    
    console.log('Generated filename:', uniqueFilename);
    
    // Upload to Supabase Storage
    const bucketName = 'make-65077a1f-gallery';
    console.log('Uploading to bucket:', bucketName);
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(uniqueFilename, bytes, {
        contentType: contentType,
        upsert: false
      });
    
    if (error) {
      console.error('Error uploading to storage:', error);
      return c.json({ error: `Error uploading file to storage: ${error.message}` }, 500);
    }
    
    console.log('Upload successful, data:', data);
    
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(uniqueFilename);
    
    console.log('Image uploaded successfully:', publicUrlData.publicUrl);
    
    return c.json({ 
      success: true,
      url: publicUrlData.publicUrl,
      filename: uniqueFilename
    });
  } catch (error) {
    console.error('Error uploading image (catch block):', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return c.json({ 
      error: 'Error processing upload',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

Deno.serve(app.fetch);