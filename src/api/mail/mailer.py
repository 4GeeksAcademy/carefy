from flask_mail import Message
from api.mail.mail_config import mail
from flask import jsonify
import os

def send_email(address, token):
    try:
        msg = Message("Carefy: Restablece tu contraseña",  # Asunto del correo
                      recipients=[address])  # Correo del destinatario

          # Definir cuerpo del correo, utilizamos la variable de entorno para PROD os.getenv("BACKEND_URL"), en DEV ponemos la del FRONT si estas usando codespace.
        if os.getenv("FLASK_DEBUG") == "1":
            msg.html = f'''
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #9a593c;">Restablece tu contraseña</h2>
        <p>Hola,</p>
        <p>Hemos recibido una solicitud para restablecer tu contraseña. Puedes hacerlo pulsando en el botón de abajo:</p>
        <p style="text-align: center;">
            <a href="https://fuzzy-waddle-pjv76xj46r375vj-3000.app.github.dev/reset-password?token={token}" 
            style="background-color: #FFC9B3; color: #9a593c; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Restablecer Contraseña
            </a>
        </p>
        <p>Si no solicitaste este cambio, simplemente ignora este correo electrónico.</p>
        <p>Gracias,</p>
        <p>El equipo de Carefy</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #777;">Este es un correo electrónico automático, por favor no respondas a este mensaje.</p>
    </div>
'''
        else:
             msg.html = f'''
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #9a593c;">Restablece tu contraseña</h2>
        <p>Hola,</p>
        <p>Hemos recibido una solicitud para restablecer tu contraseña. Puedes hacerlo pulsando en el botón de abajo:</p>
        <p style="text-align: center;">
            <a href="{os.getenv("BACKEND_URL")}/reset?token={token}" 
            style="background-color: #FFC9B3; color: #9a593c; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Restablecer Contraseña
            </a>
        </p>
        <p>Si no solicitaste este cambio, simplemente ignora este correo electrónico.</p>
        <p>Gracias,</p>
        <p>El equipo de Carefy</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #777;">Este es un correo electrónico automático, por favor no respondas a este mensaje.</p>
    </div>
'''
        

        # Enviar el correo
        mail.send(msg)
        return {'success': True, 'msg': 'correo enviado exitosamente'}
    except Exception as e:
        return {'success': False, 'msg': 'error all enviar correo' + e}
    
