/* ELEMENTS REFERENCES */

const result = document.getElementById('result');
const share = document.getElementById('share');
const generatedSubject = document.getElementById('generated_subject');
const generatedBody = document.getElementById('generated_body');
const generatedScript = document.getElementById('generated_script');
const dialog = document.getElementById('dialog');

/* UTILITY FUNCTIONS */

function hideElement(element) {
    element.style.display = 'none';
}

function showElement(element, display) {
    element.style.display = display || 'block';
}

function showDialog(message) {
    dialog.querySelector('#dialog_message').innerText = message;
    dialog.style.opacity = 1;
    dialog.style.visibility = 'visible';
}

function fetchFormData() {
    const raw = localStorage.getItem('naimail_data');

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function getFormData() {
    return {
        projectVariant: document.querySelector('input[name="project_variant"]:checked').value,
        groupEmail: document.querySelector('#group_email').value,
        componentsNumber: +document.querySelector('#components_number').value,
        components: [...document.querySelectorAll('.group-component')]
            .slice(0, +document.querySelector('#components_number').value)
            .map(component => ({
                name: component.querySelector('input[name="component_name"]').value,
                surname: component.querySelector('input[name="component_surname"]').value,
                email: component.querySelector('input[name="component_email"]').value,
                matricola: component.querySelector('input[name="component_matricola"]').value
            }))
    };
}

function updateFormData(formData) {
    document.querySelector('#project_variant_ubuntu').checked = formData.projectVariant === 'Ubuntu';
    document.querySelector('#project_variant_raspberry').checked = formData.projectVariant === 'Raspberry';
    document.querySelector('#group_email').value = formData.groupEmail;
    document.querySelector('#components_number').value = formData.componentsNumber;
    [...document.querySelectorAll('.group-component')]
    .slice(0, formData.componentsNumber)
        .forEach((componentEl, index) => {
            ['name', 'surname', 'email', 'matricola'].forEach(key =>
                componentEl.querySelector(`input[name="component_${key}"]`).value = formData.components[index][key]
            );
        });

    componentsNumberUpdated();
}

/* EVENT HANDLERS */

function copy(id) {
    const element = document.getElementById(id);
    const text = element.innerText;
    copyToClipboard(text);
    showDialog('Testo copiato negli appunti');
}

function closeDialog() {
    dialog.style.opacity = 0;
    dialog.style.visibility = 'hidden';
}

function componentsNumberUpdated() {
    const numberComponent = document.querySelector('#components_number');
    const n = +numberComponent.value;

    if (validateNumber(n)) {
        const components = [...document.querySelectorAll('.group-component')];
        components.forEach((component, index) => {
            if (index + 1 > n) {
                hideElement(component);
            } else {
                showElement(component);
            }
        });
    } else {
        document.querySelector('#components_number').value = 4;
        componentsNumberUpdated();
    }
}

function generate(fetched, isFetched) {
    const formData = isFetched ? fetched : getFormData();
    if (validateFormData(formData)) {
        localStorage.setItem('naimail_data', JSON.stringify(formData));

        if (isFetched) {
            updateFormData(formData);
        }

        showElement(result);
        generatedSubject.innerText = generateSubject(formData);
        generatedBody.innerText = generateBody(formData);
        generatedScript.innerText = generateScript(formData);
    } else {
        showDialog('Errore, compilare correttamente i campi.')
    }
}

/* ONLOAD */

document.body.onload = function() {
    const formData = fetchFormData();
    if (formData) {
        generate(formData, true);
    } else {
        hideElement(result);
        hideElement(share);
    }

}