document.getElementById('generateLeads').addEventListener('click', async () => {
  const niche = document.getElementById('niche').value;
  const res = await fetch(`/api/scrape?niche=${niche}`);
  const leads = await res.json();

  const table = document.getElementById('leadsTable');
  table.innerHTML = '';
  leads.forEach(lead => {
    const row = `<tr>
      <td>${lead.name}</td>
      <td>${lead.company}</td>
      <td>${lead.email}</td>
      <td>${lead.status}</td>
    </tr>`;
    table.innerHTML += row;
  });
});
