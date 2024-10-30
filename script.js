document.getElementById('authForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const authCode = document.getElementById('authCode').value;
    document.getElementById('message').innerText = 'Validando...';

    fetch('base.json')
        .then(response => response.json())
        .then(data => {
            const certificateData = data.find(cert => cert.authCode === authCode);

            if (certificateData) {
                createCertificate(certificateData.name, certificateData.course, certificateData.date);
                document.getElementById('message').innerText = 'Certificado encontrado!';
            } else {
                document.getElementById('message').innerText = 'Certificado não encontrado para o código informado.';
                document.getElementById('certificate').innerHTML = '';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
            document.getElementById('message').innerText = 'Erro ao carregar os dados. Tente novamente mais tarde.';
        });
});

function createCertificate(name, course, date) {
    const certificateContainer = document.getElementById('certificate');
    certificateContainer.innerHTML = `
        <p>Certificamos que 
            <strong>${name}</strong> concluiu com êxito o curso de 
            <strong>${course}</strong> 
            em ${new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}.
        </p>
    `;
}
