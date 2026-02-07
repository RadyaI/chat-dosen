import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const brutalSwal = MySwal.mixin({
  customClass: {
    popup: "border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none p-0",
    title: "font-black uppercase text-2xl mt-4",
    htmlContainer: "font-medium text-gray-600",
    confirmButton: "bg-[#FFDE59] text-black font-bold border-2 border-black px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all mx-2 rounded-none",
    cancelButton: "bg-[#FF5757] text-white font-bold border-2 border-black px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all mx-2 rounded-none",
    actions: "mb-4 gap-2"
  },
  buttonsStyling: false, 
  background: "#fff",
  iconColor: "#000",
});