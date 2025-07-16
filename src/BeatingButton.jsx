import { motion } from 'framer-motion';

const BeatingButton = ({ text = "Click Me", onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="btn bg-green-600 text-white px-6 py-2 rounded-xl shadow-md font-semibold"
      animate={{
        scale: [1, 1.1, 1], // scales up and down
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeIn",
      }}
    >
      {text}
    </motion.button>
  );
};

export default BeatingButton;
