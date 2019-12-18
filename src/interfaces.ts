export interface APIResponse {
  data: Record<string, any>;
  status: string;
}

export interface User {
  avatar: string;
  avatarHd: string;
  firstName: string;
  id: number;
  lastName: string;
  lastUpdate: Date | null;
  totalBadges: number;
  totalBeers: number;
  totalCheckins: number;
  totalFriends: number;
  userName: string;
}
