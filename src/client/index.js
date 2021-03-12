import {displayForecastformation} from "./js/diplayData.js"
import { saveUI } from "./js/diplayData.js"
import { displayErrorCountryName } from "./js/diplayData.js"
import { isNotValideDate } from "./js/diplayData.js";
import { isEmptyInput } from "./js/diplayData.js";
import { UpdateUIImage } from "./js/diplayData.js"; 
import { UpdateBodyInformation } from "./js/diplayData.js";
import { getDestinationCoordinates } from "./js/app.js";




import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";
import '../client/media/na.svg';
import '../client/media/plane-1.jpg';

export { getDestinationCoordinates,isEmptyInput,isNotValideDate,UpdateUIImage,UpdateBodyInformation,saveUI,displayForecastformation,displayErrorCountryName};
