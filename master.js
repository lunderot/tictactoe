import * as shared from './shared'

function init(conn) {
	shared.init('master', conn);
	shared.reset();
}

export { init };