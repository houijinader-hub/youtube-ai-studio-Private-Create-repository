export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: 'OPENAI_API_KEY manquante' });

  const { topic, duration = 300, lang = 'Français', tone = 'Dynamique', platform = 'YouTube 16:9' } = req.body || {};
  if (!topic || !String(topic).trim()) return res.status(400).json({ error: 'Sujet requis' });

  const prompt = `Tu es réalisateur et scénariste YouTube. Crée un projet vidéo en ${lang} sur: ${topic}. Durée cible: ${duration} secondes. Style: ${tone}. Format: ${platform}. Retourne UNIQUEMENT du JSON valide avec cette structure: {"title":"...","hook":"...","script":"...","scenes":[{"voice":"...","visual":"...","transition":"..."}]}. Le script doit être naturel, rythmé, factuel, sans inventer de sources. Chaque scène doit avoir une narration et une description visuelle exploitable par un générateur d'images/vidéos.`;

  try {
    const r = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-5.6-luna', input: prompt, reasoning: { effort: 'low' } })
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data?.error?.message || 'Erreur OpenAI' });
    const text = (data.output || []).flatMap(x => x.content || []).find(x => x.type === 'output_text')?.text || '';
    const cleaned = text.replace(/^```json\s*/i, '').replace(/```\s*$/,'').trim();
    const project = JSON.parse(cleaned);
    return res.status(200).json(project);
  } catch (e) {
    return res.status(500).json({ error: 'Impossible de générer le projet IA', detail: String(e?.message || e) });
  }
}
