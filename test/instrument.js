import blanket from 'blanket'
blanket();

import chai from 'chai'
import cas  from 'chai-as-promised'

chai.use(cas);

export default chai.expect;
