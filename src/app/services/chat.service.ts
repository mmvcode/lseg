import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, map, throwError } from 'rxjs';
import { StockExchangeService } from './stock-exchange.service';
import { Injectable } from '@angular/core';
import { TextMessageComponent } from '../components/chat/text-message/text-message.component';
import { ChatMessageData } from '../models/chat-message-data.model';
import { OptionsMessageComponent } from '../components/chat/options-message/options-message.component';
import { StockExchange } from '../models/stock-exchange.model';
import { ButtonOption } from '../models/button-option.model';
import { Stock } from '../models/stock.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly MSG_ID_SIZE = 5;
  public readonly CHATBOT_USER = 'LSEG';
  public readonly USER = 'User';

  messages: BehaviorSubject<ChatMessageData[]> = new BehaviorSubject<
    ChatMessageData[]
  >([]);

  constructor(private stockExchangeService: StockExchangeService) {}

  /**
   * Add a text message to the chat
   *
   * @param sender
   * @param message
   */
  addTextMessage(sender: string, message: string) {
    const newMessage = {
      id: this.generateId(this.MSG_ID_SIZE),
      dt: new Date(),
      sender: sender,
      component: TextMessageComponent,
      inputs: { text: message },
    };

    const newMessages = [...this.messages.getValue(), newMessage];
    this.messages.next(newMessages);
  }

  /**
   * Adds a message to the chat containing buttons for the user to click
   *
   * @param sender The sender of the message
   * @param options Options to be clicked on
   * @param optionSelected Action to be performed when an option is clicked
   */
  addOptionsMessage(
    sender: string,
    options: ButtonOption[],
    optionSelected: Function,
    title: string
  ) {
    const newMessage = {
      id: this.generateId(this.MSG_ID_SIZE),
      dt: new Date(),
      sender: sender,
      component: OptionsMessageComponent,
      inputs: {
        options: options,
        onOptionClicked: optionSelected,
        message: title,
      },
    };

    const newMessages = [...this.messages.getValue(), newMessage];
    this.messages.next(newMessages);
  }

  /**
   * Adds the stock exchange options into the chat
   */
  public addStockExchangeOptions() {
    this.stockExchangeService
      .getAllExchanges()
      .pipe(
        // Filter values without code
        map((exchanges) => exchanges.filter((exchange) => exchange.code))
      )
      .subscribe({
        next: (exchanges) => {
          const codes: ButtonOption[] = exchanges.map((e) => {
            return {
              label: e.stockExchange ?? e.code,
              value: e,
            };
          });

          this.addOptionsMessage(
            this.CHATBOT_USER,
            codes,
            (code: StockExchange) => this.addStockExchangeStock(code),
            'Please select a Stock Exchange!'
          );
        },
        error: (err) => {
          const e = this.handleError(err);
          console.log({ e });
        },
      });
  }

  /**
   * Adds the stocks as options into the chat for the selected exchange
   *
   * @param stockEx
   */
  addStockExchangeStock(stockEx: StockExchange) {
    this.addTextMessage(this.USER, stockEx.stockExchange ?? stockEx.code);
    this.stockExchangeService.getExchange(stockEx.code).subscribe({
      next: (exchange) => {
        const codes: ButtonOption[] = exchange!.topStocks
          // Filter stock without code
          .filter((stk) => stk.code)
          .map((e) => {
            return {
              label: e.stockName,
              value: e,
            };
          });

        this.addOptionsMessage(
          this.CHATBOT_USER,
          codes,
          (clicked: Stock) => this.addStockPriceMessage(clicked, exchange),
          'Please select a stock'
        );
      },
      error: (err) => {
        this.handleError(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  /**
   * Displays the price for the selected stock and gives the user
   * navigation options
   *
   *
   * @param stock
   * @param prev
   */
  addStockPriceMessage(stock: Stock, prev: StockExchange | undefined) {
    this.addTextMessage(this.USER, stock.stockName);
    const options: ButtonOption[] = [
      {
        label: 'Main menu',
        value: 0,
      },
      {
        label: 'Go back',
        value: -1,
      },
    ];

    const price = stock.price;
    let message = `Stock price of ${stock.stockName} is ${stock.price}. Please select an option`;
    if (isNaN(price)) {
      message = `Sorry, the stock price for ${stock.stockName} is not available at the moment. Please select an option`;
    }

    this.addOptionsMessage(
      this.CHATBOT_USER,
      options,
      (clicked: number) => this.navigate(clicked, prev),
      message
    );
  }

  /**
   * Decides what to show next
   *
   * @param menu
   * @param prevSelection
   */
  navigate(menu: number, prevSelection: any) {
    switch (menu) {
      case 0:
        this.addStockExchangeOptions();
        break;
      case -1:
        this.addStockExchangeStock(prevSelection);
        break;
    }
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Client-side or network error occurred.
      return throwError(() => {
        const err: any = new Error(
          'Something happened on your side. Please try again later'
        );
        err.status = error.status;
        err.timestamp = Date.now();
        return err;
      });
    } else {
      // An error occured on the server side. Perhaps the message body
      // can give more info
      console.error(
        `Server error code ${error.status}, body was: `,
        error.message
      );
    }
    // Return a user-facing error message.
    this.addTextMessage(
      this.CHATBOT_USER,
      'Something bad happened; please try again later.'
    );
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  /**
   * Generates a pseudo random id
   *
   * @param length of the id
   * @returns string the id
   */
  private generateId(length: number): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
