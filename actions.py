from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import json

class ActionCharge(Action):

    def name(self) -> Text:
        return "action_charge"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Opening JSON file
        f = open('XingFuTangBobaList.json', encoding="utf8")
        menus = json.load(f)

        price1 = {}
        for menu in menus:
            drinkType = {}

            if "options" in menu:
                for temp in menu["options"]:
                    temperature = temp["temperature"]
                    price = temp["price"]

                    drinkType[temperature] = price
            
            if not bool(drinkType):
                price1[menu["zhName"]] = menu["price"]
            else:
                price1[menu["zhName"]] = drinkType     

        inputDrinkType = tracker.get_slot("type")
        inputDrinkTemperature = tracker.get_slot("temperature")
        inputAddOn = tracker.get_slot("addon")
        inputConfirm = tracker.get_slot("respond")

        inputDrinkType = inputDrinkType.replace(" ", "")
        inputDrinkTemperature = inputDrinkTemperature.replace(" ", "")
        inputAddOn = inputAddOn.replace(" ", "")
        inputConfirm = inputConfirm.replace(" ", "")

        if inputDrinkTemperature == "热" or "热的":
            inputDrinkTemperature = "hot"
        elif inputDrinkTemperature == "冷" or "冷的":
            inputDrinkTemperature = "cold"

        if inputAddOn == "加奶":
            addon = price1["加奶"]
        elif inputAddOn == "加珍珠":
            addon = price1["加珍珠"]
        else:
            addon = 0

        try:
            ttl_price = price1[inputDrinkType][inputDrinkTemperature] + addon
            dispatcher.utter_message("一共 %s 令吉" % (ttl_price))
            dispatcher.utter_message("谢谢您!")
        except:
            dispatcher.utter_message("您的饮料只有冷饮，这里会自动帮你换成冷的哦~")
            ttl_price = price1[inputDrinkType]["cold"] + addon
            dispatcher.utter_message("一共 %s 令吉" % (ttl_price))
            dispatcher.utter_message("谢谢您!")

        # 提取饮料种类，规格
        # type = tracker.get_slot("type")
        # size = tracker.get_slot("size")
        # if size not in ['中','大','特大']:
        #     dispatcher.utter_message("不好意思，只有中杯、大杯和特大杯")
        #     return []
        # price = price1[type] * price2[size]

        # dispatcher.utter_message("您的%s杯%s一共%s元" % (size, type, price))

        return []
