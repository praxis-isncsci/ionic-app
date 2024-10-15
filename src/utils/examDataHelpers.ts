import { ExamData } from "isncsci-ui/dist/esm/core/domain"
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { jsPDF } from "jspdf";


export const exportPdf = async (examData: ExamData, name: string) => {

  const doc = new jsPDF();
  doc.text("Hello world!", 10, 10);

  //Writing File to Device
  await Filesystem.writeFile({
    path: `${name}.pdf`,
    data: doc.output(),
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
}