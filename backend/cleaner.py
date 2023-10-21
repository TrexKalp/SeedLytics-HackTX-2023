from backend.startups import startups


def location(city, state, country):
    if country == "USA":
        concat_s = city.strip() + ", " + state.strip() + ", " + country.strip()
    elif country:
        concat_s = city.strip() + ", " + country.strip()
    else:
        concat_s = "Remote"
    return concat_s


allowedMoney = "0123456789"


def money_raised(money):
    if not money:
        return 0

    money = money.split(", ")

    total_money = 0
    for dollars in money:
        dollar = ""
        for c in dollars:
            if c in allowedMoney:
                dollar += c

        if dollar:
            total_money += int(dollar)

    return total_money


for startup in startups:
    location_s = location(
        startup["hq-city"], startup["hq-state"], startup["hq-country"]
    )
    money_s = money_raised(startup["amounts"])

    print(money_s)
