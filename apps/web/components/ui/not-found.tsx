import { AuroraBackground } from "@workspace/ui/components/aurora-background";
import Link from "next/link";

export default function NotFound() {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  // Animation for the button
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-accent to-pink-500 text-white p-4 font-sans">
    //   <motion.h1
    //     className="text-9xl font-bold mb-8"
    //     initial="hidden"
    //     animate="visible"
    //     variants={textVariants}
    //     custom={0}
    //   >
    //     404
    //   </motion.h1>
    //   <motion.p
    //     className="text-2xl mb-8 text-center"
    //     initial="hidden"
    //     animate="visible"
    //     variants={textVariants}
    //     custom={1}
    //   >
    //     {`Oops! Looks like you've wandered into the void.`}
    //   </motion.p>
    //   <motion.div
    //     initial="hidden"
    //     animate="visible"
    //     variants={textVariants}
    //     custom={2}
    //   >
    //     <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
    //       <Button variant="secondary" size="lg" href="/">
    //         Beam me back to safety
    //       </Button>
    //     </motion.div>
    //   </motion.div>
    // </div>
    <AuroraBackground>
      <div className="flex flex-col items-center justify-center min-h-screen text-foreground p-4 font-sans">
        <h1 className="text-9xl font-bold mb-8">404</h1>
        <p className="text-2xl mb-8 text-center">
          {`Oops! Looks like you've wandered into the void.`}
        </p>
        <div>
          <Link
            className="text-foreground p-2 rounded-lg bg-accent hover:bg-accent-600 transition-colors"
            href="/"
          >
            Beam me back to safety
          </Link>
        </div>
      </div>
    </AuroraBackground>
  );
}
