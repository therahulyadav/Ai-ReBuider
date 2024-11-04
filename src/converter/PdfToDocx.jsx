import ConvertApi from 'convertapi-js'
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

function PdfToDocx(){
    const file = useRef();
    const label = useRef();
    const [isUploading, setIsUploading] = useState(false);
    const [isConverting, setIsConverting] = useState(false);
    const secretKey = import.meta.env.VITE_CONVERT_API_SECRET_KEY;

    const handleDownloadDoc = async () => {
        if(file.current.files[0]){
            setIsConverting(true);
            try {
                const convertApi = ConvertApi.auth(secretKey);
                const params = convertApi.createParams()
                params.add('File', file.current.files[0]);
                params.add('FileName', 'My Ai resume');
                const result = await convertApi.convert('pdf', 'docx', params);
                const url = result.files[0].Url;
                window.open(url);
                toast.success('File converted successfully!');
            } catch (error) {
                toast.error('Conversion failed. Please try again.');
            } finally {
                setIsConverting(false);
            }
        } else {
            toast.error("Please upload a file first");
        }
    };

    function changeLabel(){
        if(file.current.files[0]){
            setIsUploading(true);
            label.current.innerText = `${file.current.files[0].name} has been uploaded`;
            toast.success('File uploaded successfully!');
        }
    }

    return(
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='h-full w-full flex flex-col justify-center items-center p-8'
        >
            <motion.div 
                className='p-20 m-5 flex flex-col items-center justify-center text-center self-center border-4 border-blue-400 border-dashed rounded-xl bg-blue-50/30 hover:bg-blue-50/50 transition-colors duration-300 cursor-pointer'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <motion.label 
                    ref={label} 
                    htmlFor="fileInput"
                    className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300"
                >
                    {isUploading ? "✨ File ready for conversion" : "📄 Drop your PDF file here or click to browse"}
                </motion.label>
                <input 
                    className="hidden" 
                    onChange={changeLabel} 
                    id="fileInput" 
                    type="file" 
                    name="pdfFile" 
                    ref={file}  
                    accept="application/pdf" 
                />
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button 
                    onClick={handleDownloadDoc}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg transition-all duration-300"
                    disabled={isConverting}
                >
                    {isConverting ? "Converting..." : "Convert to DOCX ⚡"}
                </Button>
            </motion.div>
        </motion.div>
    )
}

export default PdfToDocx;