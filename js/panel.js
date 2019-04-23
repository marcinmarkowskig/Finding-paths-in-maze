/**
 * The control panel.
 */
var Panel = {
    init: function() {
        var $algo = $('#algorithm_panel');

        $('.panel').draggable(); //mozliwosc przesuwania
        $('.accordion').accordion({//otwieranie sekcji
            collapsible: false,//jedna sekcja otwarta
        });
        $('.option_label').click(function() {
            $(this).prev().click();
        });
        $('#hide_instructions').click(function() {
            $('#instructions_panel').slideUp();
        });
        $('#play_panel').css({
            top: $algo.offset().top + $algo.outerHeight() + 20
        });
        $('#button2').attr('disabled', 'disabled');
    },
    /**
     * Get the user selected path-finder.
     * TODO: clean up this messy code.
     */
    getFinder: function() {
        var finder, selected_header, heuristic, allowDiagonal, biDirectional, dontCrossCorners, weight, trackRecursion, timeLimit;

        selected_header = $(
            '#algorithm_panel ' +
            '.ui-accordion-header[aria-selected=true]'
        ).attr('id');
    //    console.log(selected_header)

        switch (selected_header) {

        case 'astar_header':
            weight = parseInt($('#astar_section .spinner').val()) || 1;
            weight = weight >= 1 ? weight : 1; /* if negative or 0, use 1 */

            //stare heuristic = $('input[name=astar_heuristic]:checked').val();
            heuristic = $('input[name=proba]:checked').val();
      //      console.log('Astar', heuristic)
                finder = new PF.AStarFinder({
                    heuristic: PF.Heuristic[heuristic],
                    weight: weight
                });
            break;

        case 'astarBi_header':
            weight = parseInt($('#astarBi_section .spinner').val()) || 1;
            weight = weight >= 1 ? weight : 1; /* if negative or 0, use 1 */

            //stary heuristic = $('input[name=astarBi_heuristic]:checked').val();
            heuristic = $('input[name=proba]:checked').val();
        //    console.log('AstarBi', heuristic)
                finder = new PF.BiAStarFinder({
                    heuristic: PF.Heuristic[heuristic],
                    weight: weight
                });
            break;

        case 'bestfirst_header':
            //stare heuristic = $('input[name=bestfirst_heuristic]:checked').val();
            heuristic = $('input[name=proba]:checked').val();
        //    console.log('BestFirst', heuristic)
                finder = new PF.BestFirstFinder({
                    heuristic: PF.Heuristic[heuristic]
                });
            break;

        case 'bestfirstBi_header':
            //stare heuristic = $('input[name=bestfirstBi_heuristic]:checked').val();
            heuristic = $('input[name=proba]:checked').val();
      //      console.log('bestfirstBi', heuristic)
                finder = new PF.BiBestFirstFinder({
                    heuristic: PF.Heuristic[heuristic]
                });
            break;

        case 'orth_jump_point_header':
        //stare  heuristic = $('input[name=orth_jump_point_heuristic]:checked').val();
          heuristic = $('input[name=proba]:checked').val();
        //    console.log('orth', heuristic)
            finder = new PF.OrthogonalJumpPointFinder({
              heuristic: PF.Heuristic[heuristic],
            });
            break;

        case 'ida_header':
            //stare heuristic = $('input[name=ida_heuristic]:checked').val();
            heuristic = $('input[name=proba]:checked').val();
          //  console.log('ida', heuristic)
            weight = parseInt($('#ida_section .spinner').val()) || 1;
            weight = weight >= 1 ? weight : 1; /* if negative or 0, use 1 */

            finder = new PF.IDAStarFinder({
              heuristic: PF.Heuristic[heuristic],
              weight: weight
            });
            break;
        }

        return finder;
    }
};
