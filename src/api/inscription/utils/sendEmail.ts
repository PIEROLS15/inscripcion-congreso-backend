import fs from 'fs'
import path from 'path'
import SibApiV3Sdk from 'sib-api-v3-sdk'

const client = SibApiV3Sdk.ApiClient.instance
client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY || ''
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi()

export async function sendApprovalEmail(toEmail: string, userName: string, pdfPath: string) {
    try {
        const sender = { email: process.env.BREVO_SENDER!, name: process.env.BREVO_SENDER_NAME }

        const fileName = path.basename(pdfPath)
        const downloadUrl = `${process.env.API_URL}/uploads/${fileName}`

        // Leer la plantilla HTML
        const templatePath = path.join(__dirname, 'templates', 'approval.html')
        let htmlContent = fs.readFileSync(templatePath, 'utf8')

        // Reemplazar placeholders
        htmlContent = htmlContent
            .replace('{{userName}}', userName)
            .replace('{{downloadUrl}}', downloadUrl)

        // Enviar correo
        await emailApi.sendTransacEmail({
            sender,
            to: [{ email: toEmail }],
            subject: process.env.BREVO_SENDER_SUBJECT,
            htmlContent,
        })

    } catch (err) {
        console.error('Error al enviar correo Brevo:', err)
    }
}
