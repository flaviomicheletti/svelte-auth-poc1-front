// export async function post(req, res) {
// 	delete req.session.user;
// 	res.end(JSON.stringify({ message: 'success!' }));
// }

import * as api from 'api';
export async function post(req, res) {
	// Apaga a sessão do usuário independentemente do
	// logout funcionar no Auth Server, guardando o jwt no blacklist...
	delete req.session.user;
	const tokenObj = req.body;
	console.info('Token em auth/logout: ', tokenObj);
	try {
		const response = await api.users.logout(tokenObj);
		console.log('Response: ', response);
		// if (response.status === 200) {
		// 	delete req.session.user;
		// }
		res.statusCode = response.status || 500;
		res.end(JSON.stringify({ message: response.message }));
	} catch (err) {
		console.log('Erro: ' + JSON.stringify(err));
		res.statusCode = err.status || 500;
		res.end(JSON.stringify({ message: err.message }));
	}
}
