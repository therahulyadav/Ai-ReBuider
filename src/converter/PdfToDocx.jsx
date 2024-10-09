import ConvertApi from 'convertapi-js'
import { useRef } from "react";
import { Button } from "@/components/ui/button";

function PdfToDocx(){
    const file = useRef();
    const label = useRef();
    const secretKey = import.meta.env.VITE_CONVERT_API_SECRET_KEY;
    const handleDownloadDoc = async () => {
        if(file.current.files[0]){
        const convertApi = ConvertApi.auth(secretKey);
        const params = convertApi.createParams()
        params.add('File', file.current.files[0]);
        params.add('FileName', 'My Ai resume');
        const result = await convertApi.convert('pdf', 'docx', params);
        const url = result.files[0].Url;
        window.open(url);
        }else{alert("Please Upload file")}
      };
    function changeLabel(){
        console.log(file.current.files[0]);
        if(file.current.files[0]){
            label.current.innerText = `${file.current.files[0].name} has been uploaded`;
        }
    }
    return(
        <div className='h-full w-full flex flex-col justify-center items-center '>

        <div className='p-20 m-5 flex flex-col items-center justify-center text-center self-center border-4 border-red-200 border-dotted md:'>
        <label ref={label} htmlFor="fileInput">Select PDF file to convert it to DOCX</label>
        <input className="hidden" onChange={changeLabel} id="fileInput" type="file" name="pdfFile" ref={file}  accept="application/pdf" ></input>
        </div>
        <div>
        <Button onClick={handleDownloadDoc}>Download Converted Docx</Button>
        </div>
        </div>
    )
}
export default PdfToDocx;