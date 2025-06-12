import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const meals = [
  { name: "Spaghetti Bolognese", price: "S/12.99" },
  { name: "Chicken Caesar Salad", price: "S/10.99" },
  { name: "Pizza Americana", price: "S/11.99" },
  { name: "Chocolate Cake", price: "S/22.99" },
];

export default function MasterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Master Page</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Meal</TableHead>
            <TableHead>Price/</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meals.map((meal, index) => (
            <TableRow key={index}>
              <TableCell>{meal.name}</TableCell>
              <TableCell>{meal.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
