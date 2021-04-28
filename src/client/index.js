//import functions export { functionName } in each js file 
// import { functionName } from './js/fileName' in this 
import datepicker from 'js-datepicker'
import 'bootstrap';
import './styles/base.scss'
// Loading weather icons
function importAll(r) {
    return r.keys().map(r);
  }
  importAll(require.context("./media/icons", false, /\.(svg)$/));
import './media/img/heart.png';
import { handleSubmit } from './js/handleSubmit'
import { addToPastTrip} from './js/handleSubmit'
import { formValidator} from './js/formValidator'


export {
    handleSubmit,
    addToPastTrip,
    formValidator
   }


