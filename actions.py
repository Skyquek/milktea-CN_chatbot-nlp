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
        f = open('XingFuTangBobaList.json')
        menus = json.load(f)
        
        zhName = []
        hotPrice = []
        coldPrice = []

        price1 = {}
        for menu in menus:
            drinkType = {}
            zhName.append(menu["zhName"])

            if "options" in menu:
                for temp in menu["options"]:
                    temperature = temp["temperature"]
                    price = temp["price"]

                    drinkType[temperature] = price
            
            if not bool(drinkType):
                price1[menu["zhName"]] = menu["price"]
            else:
                price1[menu["zhName"]] = drinkType            

        # 提取饮料种类，规格
        type = tracker.get_slot("type")
        size = tracker.get_slot("size")
        if size not in ['中','大','特大']:
            dispatcher.utter_message("不好意思，只有中杯、大杯和特大杯")
            return []
        price = price1[type] * price2[size]

        dispatcher.utter_message("您的%s杯%s一共%s元" % (size, type, price))

        return []
