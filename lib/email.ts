// lib/email.ts
import nodemailer from 'nodemailer';

// Define the order type for the email function
interface OrderDetails {
  code_commande: string;
  client_nom: string;
  client_email?: string;
  client_adresse: string;
  client_telephone: string;
  date_livraison?: string;
  montant_total: number;
  methode_paiement: string;
  articles: Array<{ nom: string; quantite: number; prix_fcfa: number }>;
}

// 1. Configure the transporter using environment variables
// IMPORTANT: You must set these in your .env.local file
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 2. Function to generate the HTML content for the email
// This function creates an elegant email body consistent with the site's design
function getOrderEmailHtml(order: OrderDetails): string {
  const adminEmail = process.env.GMAIL_MJ_EFFECT || 'contact@mjeffect.com';

  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation de commande</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background-color: #000000;
        color: #F5F5F5;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #1A1A1A;
        padding: 30px;
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
      }
      .header h1 {
        color: #FFFFFF;
        font-family: 'Playfair Display', serif;
        font-weight: 700;
        font-size: 28px;
        margin: 0;
      }
      .order-code {
        background-color: #000;
        text-align: center;
        padding: 15px;
        margin-bottom: 30px;
      }
      .order-code p {
        margin: 0;
        font-size: 14px;
        color: #AAAAAA;
      }
      .order-code .code {
        font-family: monospace;
        font-size: 24px;
        font-weight: bold;
        color: #ee5727;
        letter-spacing: 2px;
      }
      .section-title {
        font-family: 'Playfair Display', serif;
        font-weight: 600;
        font-size: 20px;
        border-bottom: 1px solid #444;
        padding-bottom: 8px;
        margin-bottom: 15px;
      }
      .details-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        font-size: 14px;
      }
      .details-grid p {
        margin: 4px 0;
      }
      .item-list {
        border-top: 1px solid #444;
        border-bottom: 1px solid #444;
        margin-top: 20px;
      }
      .item {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
        border-bottom: 1px solid #2a2a2a;
      }
      .item:last-child {
        border-bottom: none;
      }
      .total {
        text-align: right;
        margin-top: 20px;
      }
      .total p {
        margin: 0;
        font-size: 14px;
        color: #AAAAAA;
      }
      .total .amount {
        font-size: 24px;
        font-weight: bold;
      }
      .footer {
        text-align: center;
        margin-top: 30px;
        font-size: 12px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Merci pour votre confiance !</h1>
      </div>
      <div class="order-code">
        <p>Votre code de commande unique</p>
        <p class="code">${order.code_commande}</p>
      </div>

      <h2 class="section-title">Détails de la commande</h2>
      <div class="details-grid">
        <div>
          <p><strong>Client:</strong> ${order.client_nom}</p>
          <p><strong>Adresse:</strong> ${order.client_adresse}</p>
          <p><strong>Téléphone:</strong> ${order.client_telephone}</p>
        </div>
        <div>
          <p><strong>Date de livraison:</strong> ${order.date_livraison ? new Date(order.date_livraison).toLocaleDateString('fr-FR') : 'Non spécifiée'}</p>
          <p><strong>Paiement:</strong> ${order.methode_paiement}</p>
        </div>
      </div>

      <h2 class="section-title" style="margin-top: 30px;">Articles</h2>
      <div class="item-list">
        ${order.articles.map(item => `
          <div class="item">
            <span>${item.nom} (x${item.quantite})</span>
            <span style="font-family: monospace;">${(item.prix_fcfa * item.quantite).toLocaleString('fr-FR')} FCFA</span>
          </div>
        `).join('')}
      </div>

      <div class="total">
        <p>Montant Total</p>
        <p class="amount">${order.montant_total.toLocaleString('fr-FR')} FCFA</p>
      </div>

      <div class="footer">
        <p>Pour toute question, répondez à cet e-mail ou contactez-nous au ${adminEmail}.</p>
        <p>&copy; ${new Date().getFullYear()} MJ Effect. Tous droits réservés.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

// 3. Main function to send order confirmation emails
export async function sendOrderConfirmationEmail(order: OrderDetails) {
  const adminEmail = process.env.GMAIL_MJ_EFFECT;

  if (!adminEmail) {
    console.error('GMAIL_MJ_EFFECT environment variable is not set. Cannot send emails.');
    return;
  }

  const emailHtml = getOrderEmailHtml(order);

  // Email to the client
  if (order.client_email) {
    const clientMailOptions = {
      from: `"MJ Effect" <${adminEmail}>`,
      to: order.client_email,
      subject: `Votre commande MJ Effect #${order.code_commande} est confirmée`,
      html: emailHtml,
    };

    try {
      await transporter.sendMail(clientMailOptions);
      console.log(`Confirmation email sent to client: ${order.client_email}`);
    } catch (error) {
      console.error(`Failed to send email to client:`, error);
    }
  }

  // Email to the admin
  const adminMailOptions = {
    from: `"Nouvelle Commande" <${adminEmail}>`,
    to: adminEmail,
    subject: `Nouvelle commande reçue #${order.code_commande}`,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(adminMailOptions);
    console.log(`Admin notification sent for order #${order.code_commande}`);
  } catch (error) {
    console.error(`Failed to send email to admin:`, error);
  }
}
