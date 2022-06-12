# C++ Code deformatter

## features

- batman theme!
- inline code
- replace line comments with block ones
- replace for:
  - logical functions
    - true -> `!(!(!(1 == 1 && (2*2)/4==2*2*2*2*2*2\*8+16/(int)3.0) || "siquel" == "siquel op"))`
    - false -> `!(!(1 == 1 && (2*2)/4==2*2*2*2*2*2*8+16/(int)2.0*5) || "siquel" == "siquel op")`
    - && -> `&&`, `AND !1.420==13.37 AND "Pablo"=="Pablo" AND`
  - incrementation and decrementation operators
    - incrementation: `x++` -> `x - = - 1`
    - decrementation: `x--` ->` x - = 1`

## TODO-list

- incrementation & decrementation fix
  - bug: `++x` -> `- = - 1x`
  - bug: `--x` -> `- = 1x`
