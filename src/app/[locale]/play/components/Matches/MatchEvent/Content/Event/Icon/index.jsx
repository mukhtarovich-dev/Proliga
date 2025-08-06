import { MATCH_EVENTS } from 'utils/match.util'
import { RefreshCcw } from 'lucide-react'

const MatchEventIcon = ({ type }) => {
  switch (type) {
    case MATCH_EVENTS.GOAL:
      return <FootballIcon className="fill-foreground size-7" />
    case MATCH_EVENTS.MISSED_PENALTY:
      return <MissedPenaltyIcon className="fill-foreground size-7" />
    case MATCH_EVENTS.HIT_PENALTY:
      return <HitPenaltyIcon className="fill-foreground size-7" />
    case MATCH_EVENTS.TRANSFER:
      return <RefreshCcw className="text-foreground size-7" />
    case MATCH_EVENTS.RED_CARD:
      return <SoccerCardIcon className="fill-destructive size-7" />
    case MATCH_EVENTS.YELLOW_CARD:
      return <SoccerCardIcon className="fill-warning size-7" />
    default:
      return null
  }
}

const HitPenaltyIcon = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="3" width="2" height="12" rx="0.375" fill="inherit" />
      <rect
        x="2"
        y="3.95239"
        width="2"
        height="20"
        rx="0.357143"
        transform="rotate(-90 2 3.95239)"
        fill="inherit"
      />
      <rect x="20" y="3" width="2" height="12" rx="0.375" fill="inherit" />
      <rect x="9" y="15" width="6" height="6" rx="3" fill="inherit" />
    </svg>
  )
}

const MissedPenaltyIcon = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="3" width="2" height="12" rx="0.375" fill="inherit" />
      <rect
        x="2"
        y="3.82739"
        width="2"
        height="20"
        rx="0.357143"
        transform="rotate(-90 2 3.82739)"
        fill="inherit"
      />
      <rect x="20" y="3" width="2" height="6" rx="0.375" fill="inherit" />
      <rect x="9" y="16" width="6" height="6" rx="3" fill="inherit" />
      <rect
        x="19.1685"
        y="12.2949"
        width="1.20229"
        height="5.8626"
        rx="0.075"
        transform="rotate(50 19.1685 12.2949)"
        fill="inherit"
      />
      <path
        d="M21.0825 11.3924C21.1351 11.3872 21.1765 11.4365 21.1622 11.4874L20.48 13.9133C20.4637 13.9713 20.3891 13.9874 20.3503 13.9412L18.525 11.7658C18.4862 11.7197 18.515 11.649 18.5749 11.643L21.0825 11.3924Z"
        fill="inherit"
      />
    </svg>
  )
}
const SoccerCardIcon = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.9">
        <rect
          x="4"
          y="1"
          width="16"
          height="21.3333"
          rx="1.77778"
          fill="inherit"
        />
      </g>
    </svg>
  )
}

const FootballIcon = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM13.254 15.427H10.746L9.582 17.03L10.502 19.86C11.4918 20.0487 12.5082 20.0487 13.498 19.86L14.418 17.03L13.254 15.427ZM7.747 17.854H6.547C7.02229 18.2974 7.54984 18.6812 8.118 18.997L7.747 17.854ZM17.453 17.854H16.253L15.882 18.997C16.4498 18.6812 16.978 18.2973 17.453 17.854ZM6.47 11.254L4.062 13.004C4.1884 14.0038 4.50257 14.9708 4.988 15.854H7.964L9.128 14.252L8.353 11.866L6.47 11.254ZM17.53 11.254L15.647 11.866L14.872 14.251L16.036 15.854H19.012C19.4975 14.9705 19.8117 14.0032 19.938 13.003L17.53 11.254ZM12 10.236L10.322 11.455L10.963 13.427H13.037L13.677 11.455L12 10.236ZM4.747 8.621C4.47251 9.21097 4.27102 9.83223 4.147 10.471L5.118 9.764L4.747 8.621ZM19.253 8.621L18.882 9.764L19.854 10.47C19.73 9.83123 19.5285 9.20997 19.254 8.62L19.253 8.621ZM8.593 4.76C7.6807 5.18989 6.85792 5.7884 6.168 6.524L7.088 9.352L8.972 9.964L11 8.49V6.51L8.593 4.76ZM15.408 4.76L13 6.51V8.49L15.028 9.964L16.913 9.352L17.832 6.524C17.1424 5.78851 16.3199 5.19 15.408 4.76ZM12 4C11.78 4 11.5633 4.00867 11.35 4.026L11.029 4.058L12 4.764L12.971 4.058C12.6488 4.01899 12.3245 3.99962 12 4Z"
        fill="inherit"
      />
    </svg>
  )
}

export default MatchEventIcon
