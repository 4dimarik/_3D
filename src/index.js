import Timer from "./modules/timer";
import Menu from "./modules/menu";
import Modal from "./modules/modal";

const timer = new Timer(true);
const menu = new Menu();
const modal = new Modal();

timer.start();
