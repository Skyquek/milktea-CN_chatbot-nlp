import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { ChatHistorySingle, ChatRes, ChatResSingle } from 'models/chat';
import { ChatServiceService } from 'services/chat-service.service';

const mainMenu = [
  {
    enName: 'Brown Sugar Boba Milk',
    zhName: '焰遇幸福',
  },
  {
    enName: 'Mango Smoothie and Rabbit Panna Cotta',
    zhName: '芒著蹦蹦跳',
  },
  {
    enName: 'Brown Sugar Boba and Herbal Jelly Milk',
    zhName: '仙气山水画',
  },
  {
    enName: 'Soda and Handmade Jelly',
    zhName: '水母勇闯大海洋',
  },
  {
    enName: 'Matcha Boba Milk',
    zhName: '抹抹暗恋',
  },
  {
    enName: 'Strawberry Boba Milk',
    zhName: '莓天想你',
  },
  {
    enName: 'Brown Sugar Boba Milk Tea',
    zhName: '幸福黑糖珍珠厚奶茶',
  },
  {
    enName: 'Grapefruit Green Tea',
    zhName: '一颗葡萄柚鲜榨茶',
  },
  {
    enName: 'Lemon Green Tea',
    zhName: '一颗柠檬鲜绿茶',
  },
  {
    enName: 'Lemon Black Tea',
    zhName: '花开富贵',
  },
  {
    enName: 'Brown Sugar Boba Black Tea Latte',
    zhName: '黑糖珍珠红茶拿铁',
  },
  {
    enName: 'Roselle Tea mix Black Tea',
    zhName: '再一次心跳',
  },
  {
    enName: 'Green Tea mix Oolong Tea',
    zhName: '麒麟茶王',
  },
  {
    enName: 'Oolong Tea',
    zhName: '金风玉露乌龙茶',
  },
  {
    enName: 'Black Tea',
    zhName: '脸红心跳',
  },
  {
    enName: 'Green Tea',
    zhName: '夏绿蒂',
  },
];

const secondaryMenu = [
  {
    enName: 'Extra Milk',
    zhName: '加奶',
  },
  {
    enName: 'Extra Boba',
    zhName: '加珍珠',
  },
];

const temperatureMenu = [
  {
    enName: 'Hot',
    zhName: '热',
  },
  {
    enName: 'Cold',
    zhName: '冷',
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Array for message history
  chatHistory: Array<ChatHistorySingle> = [
    {
      isMine: false,
      message: '你好！',
    },
  ];
  menu = mainMenu;

  // Form containing user inputs
  chatForm = this.fb.group({
    message: [null],
  });

  constructor(
    private chatService: ChatServiceService,
    private fb: FormBuilder
  ) {}

  submit() {
    const messageValue = this.chatForm.get('message')?.value;

    this.chatHistory.push({
      isMine: true,
      message: this.chatForm.get('message')?.value,
    });
    this.chatForm.setValue({ message: null });

    this.chatService.message(messageValue).subscribe((res: ChatRes) => {
      res.forEach((responseSingle: ChatResSingle, index: number) => {
        if (index == 0) {
          this.chatHistory.push({
            isMine: false,
            message: responseSingle.text,
          });
        } else {
          if (res[index].text != res[index - 1].text) {
            this.chatHistory.push({
              isMine: false,
              message: responseSingle.text,
            });
          }
        }

        // If contains hot/cold menu
        if (RegExp(/.*[热冷].*/g).test(responseSingle.text)) {
          this.menu = temperatureMenu;
        } else if (RegExp(/.*(加奶).*(加珍珠).*/g).test(responseSingle.text)) {
          this.menu = secondaryMenu;
        } else {
          this.menu = mainMenu;
        }
      });
    });
  }

  buttonClick(menuItem: any) {
    this.chatForm.setValue({ message: menuItem.zhName });
    this.submit();
  }
}
