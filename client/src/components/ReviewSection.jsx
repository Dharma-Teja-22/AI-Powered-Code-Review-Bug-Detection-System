import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import Vizualization from "./Visualization.jsx";
import { Loader } from "lucide-react";

export default function ReviewSection({ result, isLoading, setISLoading}) {
  const [review, setReview] = useState("");
  const [bugs, setBugs] = useState("");
  const [improvements, setImprovements] = useState("");

  // useEffect(() => {
  //   setReview("This is a sample code review.");
  //   setBugs("These are some potential bugs found in the code.");
  //   setImprovements("Here are some suggested improvements for the code.");
  // }, []);

  useEffect(() => {
    if (result) {
      setReview(result?.response?.code_review);
      setBugs(result?.response?.detect_bugs);
      setImprovements(result?.response?.improvements);
    }
  }, [result]);

  return (
    <div className=" h-[465px] overflow-y-scroll no-scrollbar">
      {
        isLoading ? 
        <div className="h-[380px] flex flex-col justify-center items-center gap-3">
          <Loader className="animate-spin" size={30}/>Analyzing your code ...
        </div>
        : 
        <Accordion type="multiple" collapsible className="w-full">
          <AccordionItem value="review">
            <AccordionTrigger>
              <span className="font-bold text-lg ">Code Review</span>
            </AccordionTrigger>
            <AccordionContent>
              <Markdown className="text-[15px]" rehypePlugins={rehypeRaw} >{review ? review : "This is a sample code review."}</Markdown>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="bugs">
            <AccordionTrigger>
              <span className="font-bold text-lg">Bugs</span>
            </AccordionTrigger>
            <AccordionContent>
              <Markdown className="text-[15px]" rehypePlugins={rehypeRaw}>{bugs ? bugs: "These are some potential bugs found in the code."}</Markdown>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="improvements">
            <AccordionTrigger>
              <span className="font-bold text-lg">Suggested Improvements</span>
            </AccordionTrigger>
            <AccordionContent>
              <Markdown className="text-[15px]" rehypePlugins={rehypeRaw}>{improvements ? improvements : "Here are some suggested improvements for the code."}</Markdown>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="visualization">
            <AccordionTrigger>
              <span className="font-bold text-lg">visualization</span>
            </AccordionTrigger>
            <AccordionContent>
                {result?.response ? <Vizualization result={result} /> : <p className="text-[15px]" > Submit your code to get the response</p> }
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      }
    </div>
  );
}
