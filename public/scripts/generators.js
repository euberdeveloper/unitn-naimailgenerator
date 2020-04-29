function generateSubject(formData) {
    const matricole = formData.components.map(c => c.matricola).join(', ');
    return `PROGETTO II LabSO1 - AA 2019-2020 -- ${matricole}`;
}
function generateBody(formData) {
    const matricole = formData.components.map(c => c.matricola).join(', ');
    const componentsDetails = formData.components.map(c => `${c.name} ${c.surname}, ${c.email} ${c.matricola}`).join('\n');
    return `PROGETTO II LabSO1 - AA 2019-2020 -- ${matricole}

${formData.groupEmail} - Variante "${formData.projectVariant}"
    
    
${componentsDetails}
    
--------------------------------------------------------------------
    
TITOLO RICHIESTA
    
---Richiesta---`;
}
function generateScript(formData) {
    const serialized = JSON.stringify(formData, null, 2);
    return `generate(${serialized}, true);`;
}