package com.capstone.epicode.chess.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PieceMove {

    private int startRow;
    private int startCol;
    private int endRow;
    private int endCol;
    private String room;
   
}