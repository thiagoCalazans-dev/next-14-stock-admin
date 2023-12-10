import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { dbStock } from "@/db/stock";
import { EuroIcon } from "@/infra/icons";

export default async function Page({
  params,
}: {
  params: { productCode: string };
}) {
  const productCode = params.productCode;

  const stockProduct = await dbStock.findStockProductByCodeWithEntriesAndOuts(
    productCode
  );

  //Fazer a logica das somas e colocar nos cards

  return (
    <div className="flex-1 space-y-4 pt-6">
      <Heading
        title={stockProduct.product.name}
        description={stockProduct.product.code}
      />
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Faturamento Total
            </CardTitle>
            <EuroIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Descontos Aplicados
            </CardTitle>
            <EuroIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Faturamento Liquido
            </CardTitle>
            <EuroIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro</CardTitle>
            <EuroIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
      </section>
      <section className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Card className="h-[50rem] flex flex-col justify-between items-start ">
          <CardHeader>
            <CardTitle>Entradas</CardTitle>
            <CardDescription>Foram efetuadas X entradas</CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 flex-1 w-full">
            {stockProduct.stockEntries?.map((stockEntry) => {
              return (
                <div key={stockEntry.id} className="flex  items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Data de Compra
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stockEntry.date.toISOString()}
                    </p>
                  </div>

                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Custo unitário
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stockEntry.unitCost}
                    </p>
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Quantidade
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stockEntry.quantity}
                    </p>
                  </div>

                  <div className="ml-4 space-y-1 flex-1 flex justify-center items-end flex-col">
                    <p className="text-sm font-bold leading-none">Total</p>
                    <p className="text-sm font-bold leading-none">LOGICA</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
          <CardFooter className="flex justify-between items-center w-full">
            <CardTitle>Resultado:</CardTitle>
            <div className="space-x-4 flex">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Quantidade</p>
                <p className="text-sm text-muted-foreground">2</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold leading-none">Total</p>
                <p className="text-sm font-bold leading-none">$ 18.00</p>
              </div>
            </div>
          </CardFooter>
        </Card>
        <Card className="h-[50rem] flex flex-col justify-between items-start ">
          <CardHeader>
            <CardTitle>Saídas</CardTitle>
            <CardDescription>Foram efetuadas X saídas</CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 flex-1 w-full">
            {stockProduct.stockOuts?.map((stockOut) => {
              return (
                <div key={stockOut.id} className="flex  items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Data de Venda
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stockOut.date.toISOString()}
                    </p>
                  </div>

                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Preço unitário
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stockOut.unitPrice}
                    </p>
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Quantidade
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stockOut.quantity}
                    </p>
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Desconto</p>
                    <p className="text-sm text-muted-foreground">
                      {stockOut.discount}
                    </p>
                  </div>
                  <div className="ml-4 space-y-1 flex-1 flex justify-center items-end flex-col">
                    <p className="text-sm font-bold leading-none">Total</p>
                    <p className="text-sm font-bold leading-none">LOGIC</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
          <CardFooter className="flex justify-between items-center w-full">
            <CardTitle>Resultado:</CardTitle>
            <div className="space-x-4 flex">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Quantidade</p>
                <p className="text-sm text-muted-foreground">2</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold leading-none">Total</p>
                <p className="text-sm font-bold leading-none">$ 18.00</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
