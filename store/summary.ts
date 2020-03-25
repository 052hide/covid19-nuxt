import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import dayjs from '~/plugins/dayjs'
import { Summary } from '~/types/summary'
import { Summary as SummaryApi } from '~/api'

@Module({
  name: 'summary',
  namespaced: true,
  stateFactory: true
})
export default class SummaryModule extends VuexModule {
  private lastFetchDate: number = 0
  private summary: Summary | null = null

  // @ts-ignore
  @MutationAction({
    mutate: ['summary', 'lastFetchDate'],
    rawError: true
  })
  public async fetchSummary() {
    const summary = await SummaryApi.getSummary()
    const lastFetchDate = dayjs().unix()

    return {
      summary,
      lastFetchDate
    }
  }

  public get getSummary() {
    return this.summary
  }

  public get getLastFetchDate() {
    return this.lastFetchDate
  }
}
