interface MailchimpFormProps {
  hidden?: boolean;
}

export default function MailchimpForm({ hidden = false }: MailchimpFormProps) {
  if (hidden) {
    return null;
  }

  return (
    <div className="mailchimp-form-wrapper">
      <style>{`
        /* Mailchimp Form Styles - Dark Theme */
        #mc_embed_signup {
          background: transparent !important;
          clear: left;
          font: 14px 'Inter', Helvetica, Arial, sans-serif;
          width: 100% !important;
          max-width: 100% !important;
          color: rgba(255, 255, 255, 0.9);
        }

        #mc_embed_signup h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        #mc_embed_signup .indicates-required {
          text-align: right;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1rem;
        }

        #mc_embed_signup .asterisk {
          color: #D4AF37;
        }

        #mc_embed_signup .mc-field-group {
          margin-bottom: 1.5rem;
          padding-bottom: 0;
          min-height: 0;
        }

        #mc_embed_signup label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
        }

        #mc_embed_signup input[type="text"],
        #mc_embed_signup input[type="email"],
        #mc_embed_signup input[type="number"],
        #mc_embed_signup input[type="url"],
        #mc_embed_signup input[type="date"],
        #mc_embed_signup select,
        #mc_embed_signup textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          color: #fff;
          font-size: 1rem;
          transition: all 0.2s;
        }

        #mc_embed_signup input[type="text"]:focus,
        #mc_embed_signup input[type="email"]:focus,
        #mc_embed_signup input[type="number"]:focus,
        #mc_embed_signup input[type="url"]:focus,
        #mc_embed_signup input[type="date"]:focus,
        #mc_embed_signup select:focus,
        #mc_embed_signup textarea:focus {
          outline: none;
          border-color: #D4AF37;
          background: rgba(255, 255, 255, 0.08);
        }

        #mc_embed_signup input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        #mc_embed_signup select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23D4AF37' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 3rem;
        }

        #mc_embed_signup .helper_text {
          display: block;
          margin-top: 0.375rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        /* Checkboxes and Radio Buttons */
        #mc_embed_signup input[type="checkbox"],
        #mc_embed_signup input[type="radio"] {
          width: auto;
          margin-right: 0.5rem;
          accent-color: #D4AF37;
        }

        #mc_embed_signup .input-group ul {
          list-style: none;
          padding: 0;
          margin: 0.75rem 0;
        }

        #mc_embed_signup .input-group li {
          margin-bottom: 0.5rem;
        }

        #mc_embed_signup .input-group label {
          display: inline;
          margin: 0;
          font-weight: normal;
          cursor: pointer;
        }

        #mc_embed_signup .input-group strong {
          display: block;
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
        }

        /* Date Field */
        #mc_embed_signup .datefield {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        #mc_embed_signup .datefield .subfield input {
          width: auto;
        }

        #mc_embed_signup .datefield .dayfield input,
        #mc_embed_signup .datefield .monthfield input {
          width: 3rem;
        }

        #mc_embed_signup .datefield .yearfield input {
          width: 5rem;
        }

        #mc_embed_signup .datefield .small-meta {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          margin-left: 0.5rem;
        }

        /* GDPR Section */
        #mc_embed_signup .mergeRow {
          margin-top: 2rem;
          padding: 1.5rem;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 2px;
        }

        #mc_embed_signup .content__gdpr label {
          font-size: 1rem;
          font-weight: 600;
          color: #D4AF37;
          margin-bottom: 0.5rem;
        }

        #mc_embed_signup .content__gdpr p {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        #mc_embed_signup .mc_fieldset {
          border: none !important;
          padding: 0 !important;
          margin: 1rem 0 !important;
        }

        #mc_embed_signup .content__gdprLegal p {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 1rem;
        }

        #mc_embed_signup .content__gdprLegal a {
          color: #D4AF37;
          text-decoration: underline;
        }

        /* Submit Button */
        #mc_embed_signup .button {
          background: #D4AF37;
          color: #000;
          font-size: 1.125rem;
          font-weight: 600;
          padding: 1rem 3rem;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          margin-top: 1rem;
        }

        #mc_embed_signup .button:hover {
          background: #C5A028;
          transform: translateY(-1px);
        }

        /* Response Messages */
        #mc_embed_signup .response {
          padding: 1rem;
          margin: 1rem 0;
          border-radius: 2px;
          font-size: 0.875rem;
        }

        #mc_embed_signup #mce-error-response {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          display: none;
        }

        #mc_embed_signup #mce-success-response {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #86efac;
          display: none;
        }

        /* Honeypot */
        #mc_embed_signup div[aria-hidden="true"] {
          position: absolute;
          left: -5000px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          #mc_embed_signup h2 {
            font-size: 1.5rem;
          }

          #mc_embed_signup .datefield {
            flex-wrap: wrap;
          }

          #mc_embed_signup .button {
            padding: 0.875rem 2rem;
          }
        }
      `}</style>

      <div id="mc_embed_shell">
        <div id="mc_embed_signup">
          <form
            action="https://semanadelascuerdas.us15.list-manage.com/subscribe/post?u=191f70088d1974129eabf6baf&id=7bc479ead6&v_id=3098&f_id=00f597e0f0"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
          >
            <div id="mc_embed_signup_scroll">
              <h2>Postúlate a Cellíssimo 2026</h2>
              <div className="indicates-required">
                <span className="asterisk">*</span> indica campo obligatorio
              </div>

              <div id="mce-responses" className="clear foot">
                <div className="response" id="mce-error-response"></div>
                <div className="response" id="mce-success-response"></div>
              </div>

              {/* Email */}
              <div className="mc-field-group">
                <label htmlFor="mce-EMAIL">
                  Correo electrónico <span className="asterisk">*</span>
                </label>
                <input
                  type="email"
                  name="EMAIL"
                  className="required email"
                  id="mce-EMAIL"
                  required
                />
                <span id="mce-EMAIL-HELPERTEXT" className="helper_text">
                  Correo del estudiante
                </span>
              </div>

              {/* Name and Last Name */}
              <div className="mc-field-group">
                <label htmlFor="mce-NAME">
                  Nombre <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="NAME"
                  className="required text"
                  id="mce-NAME"
                  required
                />
              </div>

              <div className="mc-field-group">
                <label htmlFor="mce-LNAME">
                  Apellidos <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="LNAME"
                  className="required text"
                  id="mce-LNAME"
                  required
                />
              </div>

              {/* Phone */}
              <div className="mc-field-group">
                <label htmlFor="mce-CELULAR">
                  Celular (WhatsApp) <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="CELULAR"
                  className="text"
                  id="mce-CELULAR"
                />
              </div>

              {/* Instrument */}
              <div className="mc-field-group">
                <label htmlFor="mce-MMERGE23">
                  Instrumento <span className="asterisk">*</span>
                </label>
                <select name="MMERGE23" className="required" id="mce-MMERGE23" required>
                  <option value="">Selecciona...</option>
                  <option value="Violín">Violín</option>
                  <option value="Viola">Viola</option>
                  <option value="Cello">Cello</option>
                  <option value="Contrabajo">Contrabajo</option>
                  <option value="Piano">Piano</option>
                </select>
              </div>

              {/* Video URL */}
              <div className="mc-field-group">
                <label htmlFor="mce-VIDEO">
                  Video de audición <span className="asterisk">*</span>
                </label>
                <input 
                  type="url" 
                  name="VIDEO" 
                  className="required url" 
                  id="mce-VIDEO" 
                  required
                />
                <span id="mce-VIDEO-HELPERTEXT" className="helper_text">
                  URL de Youtube o Vimeo con permisos de visualización
                </span>
              </div>

              {/* Birth Date */}
              <div className="mc-field-group">
                <label htmlFor="mce-NACIMIENTO-month">
                  Fecha de nacimiento <span className="asterisk">*</span>
                </label>
                <div className="datefield">
                  <span className="subfield dayfield">
                    <input
                      className="datepart required"
                      type="text"
                      pattern="[0-9]*"
                      placeholder="DD"
                      size={2}
                      maxLength={2}
                      name="NACIMIENTO[day]"
                      id="mce-NACIMIENTO-day"
                      required
                    />
                  </span>{' '}
                  /
                  <span className="subfield monthfield">
                    <input
                      className="datepart required"
                      type="text"
                      pattern="[0-9]*"
                      placeholder="MM"
                      size={2}
                      maxLength={2}
                      name="NACIMIENTO[month]"
                      id="mce-NACIMIENTO-month"
                      required
                    />
                  </span>{' '}
                  /
                  <span className="subfield yearfield">
                    <input
                      className="datepart required"
                      type="text"
                      pattern="[0-9]*"
                      placeholder="YYYY"
                      size={4}
                      maxLength={4}
                      name="NACIMIENTO[year]"
                      id="mce-NACIMIENTO-year"
                      required
                    />
                  </span>
                  <span className="small-meta nowrap">( dd / mm / yyyy )</span>
                </div>
              </div>

              {/* City */}
              <div className="mc-field-group">
                <label htmlFor="mce-CIUDAD">
                  Ciudad donde resides <span className="asterisk">*</span>
                </label>
                <input 
                  type="text" 
                  name="CIUDAD" 
                  className="required text" 
                  id="mce-CIUDAD" 
                  required
                />
              </div>

              {/* Motivation */}
              <div className="mc-field-group">
                <label htmlFor="mce-MOTIVACION">
                  ¿Por qué quieres participar? <span className="asterisk">*</span>
                </label>
                <textarea
                  name="MOTIVACION"
                  className="required"
                  id="mce-MOTIVACION"
                  rows={4}
                  required
                />
              </div>

              {/* GDPR */}
              <div id="mergeRow-gdpr" className="mergeRow gdpr-mergeRow content__gdprBlock mc-field-group">
                <div className="content__gdpr">
                  <label>Permisos para mercadeo</label>
                  <p>
                    Por favor selecciona todas las formas en las que te gustaría recibir
                    información de Fundación Vivat:
                  </p>
                  <fieldset className="mc_fieldset gdprRequired mc-field-group">
                    <label className="checkbox subfield">
                      <input
                        type="checkbox"
                        id="gdpr_27681"
                        name="gdpr[27681]"
                        value="Y"
                        className="av-checkbox gdpr"
                      />
                      <span>Email</span>
                    </label>
                  </fieldset>
                  <p className="content__gdprLegal">
                    Usaremos la información que nos brindes en este formulario únicamente
                    para enviarte actualizaciones y mercadeo. Por favor háznoslo saber
                    marcando la casilla de arriba si deseas continuar recibiendo correo
                    nuestro.
                  </p>
                </div>
              </div>

              {/* Honeypot */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                <input
                  type="text"
                  name="b_191f70088d1974129eabf6baf_7bc479ead6"
                  tabIndex={-1}
                  defaultValue=""
                />
              </div>

              {/* Submit Button */}
              <div className="clear foot">
                <input
                  type="submit"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button"
                  value="Enviar solicitud"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
