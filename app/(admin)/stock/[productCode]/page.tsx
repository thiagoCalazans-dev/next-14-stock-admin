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
import { formatDate } from "@/domain/logics/format-date";
import { formatNumber } from "@/domain/logics/format-number";
import { resumeFunctions } from "@/domain/logics/resume-functions";
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

  return (
    <div className="flex-1 space-y-4 pt-6">
      <Heading
        title={stockProduct.product.name}
        description={stockProduct.product.code}
      />
      <ul className="flex items-center gap-4">
        <li className="font-semibold">
          Marca:
          <span className="font-normal pl-2 text-muted-foreground">
            {stockProduct.product.brand}
          </span>
        </li>
        <li className="font-semibold">
          Categoria:
          <span className="font-normal pl-2 text-muted-foreground">
            {stockProduct.product.category}
          </span>
        </li>
        <li className="font-semibold">
          Cor:
          <span className="font-normal pl-2 text-muted-foreground">
            {stockProduct.product.color}
          </span>
        </li>
        <li className="font-semibold">
          Tamanho:
          <span className="font-normal pl-2 text-muted-foreground">
            {stockProduct.product.size}
          </span>
        </li>
      </ul>
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Faturamento Total
            </CardTitle>
            <EuroIcon />
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">
              {formatNumber.toEuroCurrency(
                stockProduct.stockOuts!.reduce(
                  (acc, curr) => acc + curr.quantity * curr.unitPrice,
                  0
                )
              )}
            </span>
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
            <div className="text-2xl font-bold">
              {formatNumber.toEuroCurrency(
                stockProduct.stockOuts!.reduce(
                  (acc, curr) =>
                    acc +
                    ((curr.quantity * curr.unitPrice) / 100) * curr.discount!,
                  0
                )
              )}
            </div>
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
            <div className="text-2xl font-bold">
              {formatNumber.toEuroCurrency(
                resumeFunctions.SumTotalStockOutsPrice(stockProduct.stockOuts)
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro</CardTitle>
            <EuroIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber.toEuroCurrency(
                resumeFunctions.SumTotalStockOutsPrice(stockProduct.stockOuts) -
                  resumeFunctions.SumTotalStockEntriesCost(
                    stockProduct.stockEntries
                  )
              )}
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="max-h-fit  grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Card className=" flex flex-col justify-between items-start ">
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
                      {formatDate.toStringBrFormat(stockEntry.date)}
                    </p>
                  </div>

                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Custo unitário
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatNumber.toEuroCurrency(stockEntry.unitCost)}
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
                    <p className="text-sm font-bold leading-none">
                      {formatNumber.toEuroCurrency(
                        resumeFunctions.SumTotalCost(stockEntry)
                      )}
                    </p>
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
                <p className="text-sm text-muted-foreground">
                  {resumeFunctions.SumStockEntriesQuantity(
                    stockProduct.stockEntries
                  )}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold leading-none">Total</p>
                <p className="text-sm font-bold leading-none">
                  {formatNumber.toEuroCurrency(
                    resumeFunctions.SumTotalStockEntriesCost(
                      stockProduct.stockEntries
                    )
                  )}
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>
        <Card className="flex flex-col justify-between items-start ">
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
                      {formatDate.toStringBrFormat(stockOut.date)}
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
                    <p className="text-sm font-bold leading-none">
                      {formatNumber.toEuroCurrency(
                        resumeFunctions.SumTotalPrice(stockOut)
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
          <CardFooter className="flex justify-between items-center w-full">
            <CardTitle>Resultado:</CardTitle>
            <div className="space-x-4 flex">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Qtde</p>
                <p className="text-sm text-muted-foreground">
                  {resumeFunctions.SumStockOutsQuantity(stockProduct.stockOuts)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold leading-none">Total</p>
                <p className="text-sm font-bold leading-none">
                  {formatNumber.toEuroCurrency(
                    resumeFunctions.SumTotalStockOutsPrice(
                      stockProduct.stockOuts
                    )
                  )}
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
