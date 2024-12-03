import { Card, CardContent } from "@/components/ui/card";

type StatsCardProps = {
  icon: React.ElementType;
  label: string;
  value: string;
  bgColor: string;
  iconColor: string;
};

const StatsCard = ({
  icon: Icon,
  label,
  value,
  bgColor,
  iconColor,
}: StatsCardProps) => {

  

  return (
    <Card className="bg-blue-500/50 border-blue-700/50 hover:bg-blue-800/80 transition-colors cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 bg">
          <div className={`p-3 rounded-lg ${bgColor}`}>
            <Icon className={`size-6 ${iconColor}`} />
          </div>

          <div>
            <p className="text-sm text-zinc-400">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
