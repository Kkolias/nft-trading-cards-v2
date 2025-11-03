import { CardRarity } from "../../enums/cardRarity.enum";
import { UnboxCardRandomizerV1 } from "./unboxCardRandomizer";

let instance: any
beforeEach(() => {
    instance = new UnboxCardRandomizerV1();
})

const commonCardData = {
    rarity: CardRarity.common,
    supply: 100000,
    unboxCount: 0,
}

const unAvailableCommonCardData = {
    rarity: CardRarity.common,
    supply: 100000,
    unboxCount: 100000,
}

const rareCardData = {
    rarity: CardRarity.rare,
    supply: 50000,
    unboxCount: 0,
}

const epicCardData = {
    rarity: CardRarity.epic,
    supply: 10000,
    unboxCount: 0,
}

const legendaryCardData = {
    rarity: CardRarity.legendary,
    supply: 1000,
    unboxCount: 0,
}

const commonCard1 = { id: 'c1', ...commonCardData } as any
const commonCard2 = { id: 'c2', ...commonCardData } as any
const unAvailableCommonCard = { id: 'c3', ...unAvailableCommonCardData } as any
const rareCard1 = { id: 'r1', ...rareCardData } as any
const rareCard2 = { id: 'r2', ...rareCardData } as any
const epicCard1 = { id: 'e1', ...epicCardData } as any
const epicCard2 = { id: 'e2', ...epicCardData } as any
const legendaryCard1 = { id: 'l1', ...legendaryCardData } as any
const legendaryCard2 = { id: 'l2', ...legendaryCardData } as any

const cardPool = [
    commonCard1,
    commonCard2,
    unAvailableCommonCard,
    rareCard1,
    rareCard2,
    epicCard1,
    epicCard2,
    legendaryCard1,
    legendaryCard2,
]

describe("getRandomCardsFromPool", () => {
    it("works", () => {
        const r = instance.getRandomCardsFromPool(cardPool, 5)
        const cards = r.map((x: any) => x.card)
        const amounts = r.map((x: any) => x.amount).reduce((a: number, b: number) => a + b, 0)
        expect(amounts).toBe(5)
        expect(cards).not.toContain(unAvailableCommonCard)
    })
})