import controller from './controller';
import context from './context';

try {
	const user = JSON.parse(controller.checkAuth());
	if (user && (user.displayName || user.email)) {
		context.displayName.innerText = user.displayName || user.email;
	}
} catch (error) {
	
}

