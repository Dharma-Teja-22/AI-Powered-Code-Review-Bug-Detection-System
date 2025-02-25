import { useState } from "react";
import CodeEditor from "./CodeEditor.jsx";
import ReviewSection from "./ReviewSection.jsx";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "@/services/API.js";

export default function CodeReviewSystem() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isLoading, setISLoading]= useState(false);

  const schema = z.object({
    language: z.string().min(1, "Please select a language"),
    code: z.string().min(5, "Code must have at least 5 characters"),
  });

  const handleClear = async () => {
    setCode("");
    setSelectedLanguage("");
    setResult([]);
  };

  const handleSubmit = async () => {
    const validation = schema.safeParse({ language: selectedLanguage, code });

    if (!validation.success) {
      const errorMsg = validation.error.errors[0].message;
      toast.error(errorMsg);
      return;
    }
    else
    {
        try {
            const response = await API.post.fetchCodeReviewResponse(selectedLanguage, code);
            if(response.status === 200)
            {
                setResult(response);
                toast.success("Code submitted successfully!");
            }
            else
            {
                setResult([]);
                toast.warning("Something Went Wrong!")
            }
          } 
        catch (error) {
            console.error("Error fetching review response:", error);
          }
    }
  };

  return (
    <div className="container py-4 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold">Code Input</h2>
            <div className="border">
              <Select onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {["c", "c++", "mysql", "python", "java", "html", "css", "javascript", "typescript", "markdown", "json"].map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <CodeEditor code={code} setCode={setCode}  handleSubmit={handleSubmit} selectedLanguage={selectedLanguage}  handleClear={handleClear} isLoading={isLoading} setISLoading={setISLoading} />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Review</h2>
          <ReviewSection result={result} isLoading={isLoading} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
