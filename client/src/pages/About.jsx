import { motion } from "framer-motion";

export default function About() {
  return (
    <div style={{ fontFamily: "Oswald, sans-serif" }}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-3 text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-3xl font font-semibold text-center my-7">
              Welcome to Armarch
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-md text-gray-500 flex flex-col gap-6">
              <p>
                At ArmArch, our philosophy revolves around our belief in the
                transformative power of spaces. We aim to seamlessly blend
                functionality, beauty, and sustainability into our creations.
                As an architecture firm, we are committed to dedicating
                ourselves to crafting innovative and thoughtful designs. Our
                goal is to not only enrich the lives of our clients but also
                positively impact the communities they serve. Fueled by a
                passion for architecture and an unwavering commitment to
                excellence, we strive to deliver exceptional projects that
                stand the test of time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
