import fetch from 'node-fetch';
import { addLead } from './leads.js';

export async function generateLeads(niche, KV) {
  // Example: scrape from public business API
  const response = await fetch(`https://api.publicbusinesses.com/search?niche=${niche}`);
  const data = await response.json();

  const verifiedLeads = [];
  for (const lead of data.results) {
    if (await verifyEmail(lead.email)) {
      await addLead(lead, KV);
      verifiedLeads.push(lead);
    }
  }
  return verifiedLeads;
}

// Email verification via NeverBounce API
async function verifyEmail(email) {
  const res = await fetch(`https://api.neverbounce.com/v4/single/check?email=${email}&key=YOUR_API_KEY`);
  const result = await res.json();
  return result.result === 'valid';
}
