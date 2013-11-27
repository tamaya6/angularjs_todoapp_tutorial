angular.module('App', [])
.controller('MainController', ['$scope', '$filter', function ($scope, $filter) {
    $scope.todos = [];
    $scope.newTitle = '';

    $scope.addTodo = function () {
        $scope.todos.push({
            title: $scope.newTitle,
            done: false
        });

        $scope.newTitle = '';
    };

    // フィルタリングの条件モデル
    $scope.filter = {
        done: { done: true },
        remaining: {done: false }
    };

    // 現在のフィルタの状態モデル
    $scope.currentFilter = null;

    // フィルタリング条件を変更するメソッド
    $scope.changeFilter = function (filter) {
        $scope.currentFilter = filter;
    };

    var where = $filter('filter');    // filter関数の取得
    $scope.$watch('todos', function (todos) {
        // todosが増減したり各要素のプロパティが変更された時に実行される
        var length = todos.length;

        $scope.allCount = length;
        $scope.doneCount = where(todos, $scope.filter.done).length;
        $scope.remainingCount = length - $scope.doneCount;
    }, true);

}]);