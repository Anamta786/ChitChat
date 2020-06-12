import ReactOnRails from 'react-on-rails';

import IslioChat from '../bundles/islioChat/startup/IslioChat';

// This is how react_on_rails can see the Islio in the browser.
ReactOnRails.register({
  IslioChat,
});
