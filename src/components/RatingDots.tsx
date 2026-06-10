type RatingDotsProps = {
  rating: number;
};

const tierClasses = [
  { filled: "bg-danger", border: "border-danger" },        // 1: Beginner
  { filled: "bg-secondary", border: "border-secondary" },  // 2: Learning
  { filled: "bg-primary", border: "border-primary" },      // 3: Confident
  { filled: "bg-success", border: "border-success" },      // 4: Strong
  { filled: "bg-tertiary", border: "border-tertiary" },    // 5: Mastered
];

const RatingDots = ({ rating }: RatingDotsProps) => {
  const tier = tierClasses[rating - 1];

  return (
    <div className="flex gap-1 item-center justify-center">
      {[1, 2, 3, 4, 5].map((dot) => (
        <div
          key={dot}
          className={`md:w-4 md:h-4 w-3 h-3 rounded-full ${
            dot <= rating
              ? tier.filled
              : `border border-dashed ${tier.border}`
          }`}
        />
      ))}
    </div>
  );
};

export default RatingDots;