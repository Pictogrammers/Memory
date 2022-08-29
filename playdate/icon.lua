local pd <const> = playdate
local gfx <const> = pd.graphics

local icons = playdate.graphics.imagetable.new('images/memory')

class('Icon').extends(gfx.sprite)

function Icon:init(x, y, iconIndex)
    Icon.super.init(self)
    self:moveTo(x, y)
    self:setIcon(iconIndex)
end

function Icon:setIcon(iconIndex)
    local cache = gfx.image.new(22, 22)
    gfx.pushContext(cache)
        local icon = icons:getImage(iconIndex)
        icon:draw(0, 0)
    gfx.popContext()
    self:setImage(cache)
end

IconAlert = 1
IconAlphaAFill = 2
IconAlphaA = 3
IconAlphaBFill = 4
IconAlphaB = 5
IconAlphaCFill = 6
IconAlphaC = 7
IconAlphaDFill = 8
IconAlphaD = 9
IconAlphaEFill = 10
IconAlphaE = 11
IconAlphaFFill = 12
IconAlphaF = 13
IconAlphaGFill = 14
IconAlphaG = 15
IconAlphaHFill = 16
IconAlphaH = 17
IconAlphaIFill = 18
IconAlphaI = 19
IconAlphaJFill = 20
IconAlphaJ = 21
IconAlphaKFill = 22
IconAlphaK = 23
IconAlphaLFill = 24
IconAlphaL = 25
IconAlphaMFill = 26
IconAlphaM = 27
IconAlphaNFill = 28
IconAlphaN = 29
IconAlphaOFill = 30
IconAlphaO = 31
IconAlphaPFill = 32
IconAlphaP = 33
IconAlphaQFill = 34
IconAlphaQ = 35
IconAlphaRFill = 36
IconAlphaR = 37
IconAlphaSFill = 38
IconAlphaS = 39
IconAlphaTFill = 40
IconAlphaT = 41
IconAlphaUFill = 42
IconAlphaU = 43
IconAlphaVFill = 44
IconAlphaV = 45
IconAlphaWFill = 46
IconAlphaW = 47
IconAlphaXFill = 48
IconAlphaX = 49
IconAlphaYFill = 50
IconAlphaY = 51
IconAlphaZFill = 52
IconAlphaZ = 53
IconArrowBottomLeft = 54
IconArrowBottomRight = 55
IconArrowDownBold = 56
IconArrowDownLeft = 57
IconArrowDownRight = 58
IconArrowDown = 59
IconArrowLeftBold = 60
IconArrowLeftDown = 61
IconArrowLeftRight = 62
IconArrowLeftUp = 63
IconArrowLeft = 64
IconArrowRightBold = 65
IconArrowRightDown = 66
IconArrowRightUp = 67
IconArrowRight = 68
IconArrowTopLeft = 69
IconArrowTopRight = 70
IconArrowUpBold = 71
IconArrowUpDown = 72
IconArrowUpLeft = 73
IconArrowUpRight = 74
IconArrowUp = 75
IconArrow = 76
IconAxe = 77
IconBattery0 = 78
IconBattery100 = 79
IconBattery25 = 80
IconBattery50 = 81
IconBattery75 = 82
IconBattleAxe = 83
IconBook = 84
IconBookmark = 85
IconBowArrow = 86
IconBow = 87
IconBox = 88
IconBug = 89
IconCalendarMonth = 90
IconCalendar = 91
IconCardText = 92
IconCard = 93
IconCheck = 94
IconCheckboxBlank = 95
IconCheckboxCross = 96
IconCheckboxMarked = 97
IconChevronDownCircle = 98
IconChevronDown = 99
IconChevronLeftCircle = 100
IconChevronLeft = 101
IconChevronRightCircle = 102
IconChevronRight = 103
IconChevronUpCircle = 104
IconChevronUp = 105
IconCircle = 106
IconClock = 107
IconCompassEastArrow = 108
IconCompassNorthArrow = 109
IconCompassNorthEast = 110
IconCompassNorthWest = 111
IconCompassSouthArrow = 112
IconCompassSouthEast = 113
IconCompassSouthWest = 114
IconCompassWestArrow = 115
IconCompass = 116
IconCrown = 117
IconCubeUnfolded = 118
IconDatabase = 119
IconDevice = 120
IconDoorOpen = 121
IconDoor = 122
IconDownload = 123
IconFile = 124
IconFlaskEmpty = 125
IconFlaskRoundBottomEmpty = 126
IconFlaskRoundBottom = 127
IconFlask = 128
IconFolderOpen = 129
IconFolder = 130
IconGamepadCenter = 131
IconGamepadDownLeft = 132
IconGamepadDownRight = 133
IconGamepadDown = 134
IconGamepadEmpty = 135
IconGamepadLeft = 136
IconGamepadRight = 137
IconGamepadUpLeft = 138
IconGamepadUpRight = 139
IconGamepadUp = 140
IconHeart = 141
IconImage = 142
IconLockOpen = 143
IconLock = 144
IconLogin = 145
IconLogout = 146
IconMap = 147
IconMenuBottomLeft = 148
IconMenuBottomRight = 149
IconMenuDownFill = 150
IconMenuDown = 151
IconMenuLeftFill = 152
IconMenuLeftRight = 153
IconMenuLeft = 154
IconMenuRightFill = 155
IconMenuRight = 156
IconMenuTopLeft = 157
IconMenuTopRight = 158
IconMenuUpDown = 159
IconMenuUpFill = 160
IconMenuUp = 161
IconMessageText = 162
IconMessage = 163
IconMonitorImage = 164
IconMonitor = 165
IconNote = 166
IconNotebook = 167
IconPencil = 168
IconPickaxe = 169
IconPictogrammers = 170
IconRadioboxMarked = 171
IconRadiobox = 172
IconRotateClockwise = 173
IconRotateCounterclockwise = 174
IconScript = 175
IconShield = 176
IconSword = 177
IconTagText = 178
IconTag = 179
IconTextBox = 180
IconToggleSwitchOff = 181
IconToggleSwitchOn = 182
IconTooltipAboveAlert = 183
IconTooltipAboveText = 184
IconTooltipAbove = 185
IconTooltipBelowAlert = 186
IconTooltipBelowText = 187
IconTooltipBelow = 188
IconTooltipEndAlert = 189
IconTooltipEndText = 190
IconTooltipEnd = 191
IconTooltipStartAlert = 192
IconTooltipStartText = 193
IconTooltipStart = 194
IconTrash = 195
IconUpload = 196
IconVolumeHigh = 197
IconVolumeLow = 198
IconVolumeMedium = 199
IconVolumeMute = 200
IconWall = 201