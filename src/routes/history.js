import { createBrowserHistory } from 'history';
import { HISTORY_BASENAME } from 'constants/env';

const history = createBrowserHistory({ basename: HISTORY_BASENAME });

export { history };
