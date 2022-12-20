from yahoo_fin.stock_info import get_dividends
import datetime
data = "01-01-"+str(int(str(datetime.date.today())[0:4])-1)
ativo = input('Ativo:')+".SA"
dividendos = get_dividends(ativo, data)
print(dividendos)
