import { RestHistoryEntry } from '../models/RestHistoryEntry';

export class HistoryService {
  
  constructor(private baseUrl: string) { }

  private getCollectionUrl() {
    return this.baseUrl + '/history';
  }

  private getElementUrl(entryId: number) {
    return this.baseUrl + '/history/' + encodeURIComponent(entryId);
  }

  async allHistory() {
    const res = await fetch(this.getCollectionUrl());
    return res.json() as Promise<RestHistoryEntry[]>;
  }

  async appendHistoryEntry(entry: RestHistoryEntry) {
    
    const res = await fetch(this.getCollectionUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    
    return res.json() as Promise<RestHistoryEntry>;

  }

  async removeHistoryEntry(entryId: number) {

    const res = await fetch(this.getElementUrl(entryId), {
      method: 'DELETE',
    });
    
    return res.json();

  }

}