type TimezoneDate := {
    iso: String,
    timezone?: String
}

type IsoDate := {
    year: Number,
    month: NUmber,
    day: Number,
    hour: Number,
    minute: Number,
    second: Number,
    millisecond: Number,
    offset: String
}

type Timezone := {
    IsoString: (date: TimezoneData) => String &
        (date: String, timezone: String) => String,
    format: (date: String, formatter: String) => String,
    addMillisecond: (date: TimezoneData, milliSeconds: Number) => String &
        (date: String, timezone: String, milliSeconds: Number) => String
    addSecond: (date: TimezoneData, seconds: Number) => String &
        (date: String, timezone: String, seconds: Number) => String
    addMinute: (date: TimezoneData, minutes: Number) => String &
        (date: String, timezone: String, minutes: Number) => String
    addHour: (date: TimezoneData, hours: Number) => String &
        (date: String, timezone: String, hours: Number) => String
    addDay: (date: TimezoneData, days: Number) => String &
        (date: String, timezone: String, days: Number) => String
    addWeek: (date: TimezoneData, weeks: Number) => String &
        (date: String, timezone: String, weeks: Number) => String
    addYear: (date: TimezoneData, years: Number) => String &
        (date: String, timezone: String, years: Number) => String
}

browser-tz := (timezoneData: Object) => Timezone
browser-tz/iso-date/parse := (String) => IsoDate | null
browser-tz/iso-date/format := (IsoDate | Date, offset?: String) => String
browser-tz/moment/format := (MomentDate) => String
browser-tz/moment/parse := (TimezoneDate, isoDate?: IsoDate) => MomentDate | null
