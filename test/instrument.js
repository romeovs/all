import chai from 'chai'
import cas  from 'chai-as-promised'
import Lab from 'lab'

chai.use(cas);

var lab      = Lab.script();
var describe = lab.describe;
var it       = lab.it;

export default {
  expect: chai.expect
, describe
, lab
, it
}
