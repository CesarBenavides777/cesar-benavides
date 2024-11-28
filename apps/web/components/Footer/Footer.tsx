import { MdEmail } from "react-icons-all-files/md/MdEmail";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Button } from "../ui/button";

type FooterProps = {
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  email: string;
};

const Footer: React.FC<FooterProps> = ({
  githubUrl,
  linkedinUrl,
  twitterUrl,
  email,
}) => {
  return (
    <footer className="flex flex-col items-center justify-center w-full h-24 border-t dark:border-night max-w-5xl mx-auto sticky bottom-0 top-full px-2 md:px-6">
      <div className="flex space-x-4">
        <Button href={githubUrl} variant="outline" size="sm" className={"p-2"}>
          <FaGithub className="h-6 w-6" />
          <span className="sr-only">GitHub</span>
        </Button>
        <Button href={twitterUrl} variant="outline" size="sm" className={"p-2"}>
          <FaXTwitter className="h-6 w-6" />
          <span className="sr-only">X</span>
        </Button>
        <Button
          href={linkedinUrl}
          variant="outline"
          size="sm"
          className={"p-2"}
        >
          <FaLinkedin className="h-6 w-6" />
          <span className="sr-only">LinkedIn</span>
        </Button>
        <Button
          href={`mailto:${email}`}
          variant="outline"
          size="sm"
          className={"p-2"}
        >
          <MdEmail className="h-6 w-6" />
          <span className="sr-only">Email</span>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
